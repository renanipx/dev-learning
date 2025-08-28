// 1️⃣ Access environment variables
console.log('--- Environment Variables ---');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not defined');

// Example: NODE_ENV=production node process_demo.js
// If NODE_ENV is not set, "not defined" will appear

// 2️⃣ Access command-line arguments
console.log('\n--- Command-line Arguments ---');
console.log(process.argv);

// Example: node process_demo.js hello world
// Output will include ["hello", "world"] at the end

// 3️⃣ Handle process events
process.on('exit', (code) => {
    console.log(`\n[Event] Process is about to exit with code: ${code}`);
});

process.on('uncaughtException', (err) => {
    console.error('[Event] Uncaught Exception:', err.message);
    process.exit(1);
});

// 4️⃣ Trigger an uncaught exception for demo
setTimeout(() => {
    // Uncomment to test error handling
    // throw new Error('Something went wrong!');
}, 2000);

// 5️⃣ Exit manually after 5 seconds
setTimeout(() => {
    console.log('\nExiting process manually...');
    process.exit(0);
}, 5000);
