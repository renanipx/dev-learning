const fs = require('fs');

const startTimestampMs = Date.now();
function now() {
  return `${Date.now() - startTimestampMs}ms`;
}

function blockCpuFor(durationMs) {
  const end = Date.now() + durationMs;
  // Purposefully block the main thread to simulate CPU-bound work
  // (e.g., huge JSON parse, synchronous crypto, tight loops)
  while (Date.now() < end) {}
}

async function scenarioNonBlockingIO() {
  console.log(`\n[${now()}] Scenario 1: Non-blocking I/O (fs.readFile)`);

  setTimeout(() => {
    console.log(`[${now()}] setTimeout(0) executed`);
  }, 0);

  fs.readFile(__filename, (err, data) => {
    if (err) {
      console.log(`[${now()}] Error in fs.readFile:`, err.message);
      return;
    }
    console.log(`[${now()}] fs.readFile callback: file read (${data.length} bytes)`);
  });

  console.log(`[${now()}] Simulating CPU-bound task (~300ms) that DELAYS callbacks...`);
  blockCpuFor(300);
  console.log(`[${now()}] CPU released (event loop can now drain timers/I/O)`);

  // Give a short breather so callbacks can run before the next scenario
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function scenarioBlockingIO() {
  console.log(`\n[${now()}] Scenario 2: BLOCKING I/O (fs.readFileSync)`);

  console.log(`[${now()}] Starting fs.readFileSync (blocks the event loop until it finishes)...`);
  const data = fs.readFileSync(__filename);
  console.log(`[${now()}] fs.readFileSync finished (${data.length} bytes)`);

  setTimeout(() => {
    console.log(`[${now()}] setTimeout(0) after synchronous operation`);
  }, 0);

  // Brief pause to clearly visualize the order
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function main() {
  console.log('=== DEMO: Non-Blocking I/O in Node.js ===');
  console.log('\nGoal: Show that asynchronous I/O operations do not block the main thread,\nbut their callbacks ONLY run when the event loop is free (no CPU-bound/blocking work).');

  await scenarioNonBlockingIO();
  await scenarioBlockingIO();

  console.log(`\n[${now()}] Done`);
}

main().catch(err => {
  console.error('Demo error:', err);
  process.exit(1);
});

