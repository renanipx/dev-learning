const fs = require('fs');
const http = require('http');

console.log('=== REAL EVENT LOOP EXAMPLE ===\n');

// SIMPLE REST API SIMULATION
const server = http.createServer((req, res) => {
    console.log(`\n[${new Date().toISOString()}] New request: ${req.method} ${req.url}`);
    
    // 1. SYNCHRONOUS OPERATION (executed immediately)
    const requestId = Math.random().toString(36).substr(2, 9);
    console.log(`Request ID: ${requestId}`);
    
    // 2. MICROTASK - process.nextTick (highest priority)
    process.nextTick(() => {
        console.log(`[${requestId}] process.nextTick: Logging request details`);
    });
    
    // 3. MICROTASK - Promise
    Promise.resolve().then(() => {
        console.log(`[${requestId}] Promise: Validating request`);
    });
    
    // 4. MACROTASK - setTimeout (simulates async processing)
    setTimeout(() => {
        console.log(`[${requestId}] setTimeout: Processing request data`);
    }, 0);
    
    // 5. I/O OPERATION - File reading
    fs.readFile(__filename, (err, data) => {
        if (err) {
            console.log(`[${requestId}] Error reading file`);
            res.writeHead(500);
            res.end('Internal error');
            return;
        }
        console.log(`[${requestId}] fs.readFile: File read successfully (${data.length} bytes)`);
    });
    
    // 6. setImmediate (executes after I/O)
    setImmediate(() => {
        console.log(`[${requestId}] setImmediate: Finalizing processing`);
    });
    
    // IMMEDIATE RESPONSE (synchronous)
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
        message: 'Request processed',
        requestId: requestId,
        timestamp: new Date().toISOString()
    }));
});

// START SERVER
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
    console.log('Make some requests to see the event loop in action!\n');
});

// BACKGROUND OPERATIONS SIMULATION
console.log('=== BACKGROUND OPERATIONS ===');

// 1. PERIODIC TASK (setInterval)
let taskCounter = 0;
const backgroundTask = setInterval(() => {
    taskCounter++;
    console.log(`[BACKGROUND] Periodic task #${taskCounter} executed`);
    
    if (taskCounter >= 5) {
        clearInterval(backgroundTask);
        console.log('[BACKGROUND] Periodic task finished');
    }
}, 2000);

// 2. SIMULATED ASYNC PROCESSING
function processDataAsynchronously(data) {
    return new Promise((resolve) => {
        // Simulates heavy processing
        setTimeout(() => {
            const result = data.map(item => item * 2);
            console.log('[BACKGROUND] Data processed:', result);
            resolve(result);
        }, 1000);
    });
}

// 3. MICROTASKS vs MACROTASKS EXAMPLE
async function microtasksVsMacrotasksExample() {
    console.log('\n=== EXAMPLE: MICROTASKS vs MACROTASKS ===');
    
    console.log('1. Starting processing...');
    
    // MACROTASK
    setTimeout(() => {
        console.log('4. setTimeout executed (macrotask)');
    }, 0);
    
    // MICROTASK
    Promise.resolve().then(() => {
        console.log('2. Promise executed (microtask)');
    });
    
    // MICROTASK with highest priority
    process.nextTick(() => {
        console.log('2. process.nextTick executed (microtask - highest priority)');
    });
    
    // MICROTASK - async/await
    await new Promise(resolve => {
        console.log('3. Internal promise created');
        resolve();
    });
    
    console.log('5. Processing finished');
}

// 4. CALLBACK HELL vs PROMISES EXAMPLE
function callbackHellExample() {
    console.log('\n=== EXAMPLE: CALLBACK HELL vs PROMISES ===');
    
    // CALLBACK HELL (old pattern)
    fs.readFile(__filename, (err1, data1) => {
        if (err1) {
            console.log('Error reading file 1');
            return;
        }
        console.log('File 1 read');
        
        fs.readFile(__filename, (err2, data2) => {
            if (err2) {
                console.log('Error reading file 2');
                return;
            }
            console.log('File 2 read');
            
            fs.readFile(__filename, (err3, data3) => {
                if (err3) {
                    console.log('Error reading file 3');
                    return;
                }
                console.log('File 3 read - Callback Hell finished');
            });
        });
    });
    
    // PROMISES (modern pattern)
    const fsPromises = require('fs').promises;
    
    fsPromises.readFile(__filename)
        .then(() => {
            console.log('Promise 1 resolved');
            return fsPromises.readFile(__filename);
        })
        .then(() => {
            console.log('Promise 2 resolved');
            return fsPromises.readFile(__filename);
        })
        .then(() => {
            console.log('Promise 3 resolved - Clean code!');
        })
        .catch(err => {
            console.log('Error in promises:', err.message);
        });
}

// 5. MEMORY LEAK WITH EVENT LISTENERS EXAMPLE
function memoryLeakExample() {
    console.log('\n=== EXAMPLE: MEMORY LEAK PREVENTION ===');
    
    const EventEmitter = require('events');
    const emitter = new EventEmitter();
    
    // ❌ WRONG - Memory leak
    setInterval(() => {
        emitter.on('data', () => {
            console.log('Event listener executed (memory leak)');
        });
    }, 1000);
    
    // ✅ CORRECT - Remove listeners
    setInterval(() => {
        const handler = () => {
            console.log('Event listener executed (no leak)');
        };
        
        emitter.on('data', handler);
        emitter.emit('data');
        emitter.removeListener('data', handler);
    }, 2000);
    
    // Stop after 10 seconds
    setTimeout(() => {
        console.log('Memory leak example finished');
    }, 10000);
}

// EXECUTE EXAMPLES
setTimeout(microtasksVsMacrotasksExample, 1000);
setTimeout(callbackHellExample, 3000);
setTimeout(memoryLeakExample, 5000);

// PROCESS DATA IN BACKGROUND
setTimeout(async () => {
    const data = [1, 2, 3, 4, 5];
    console.log('\n[BACKGROUND] Processing data:', data);
    await processDataAsynchronously(data);
}, 7000);

console.log('\n=== INSTRUCTIONS ===');
console.log('1. Server is running at http://localhost:3000');
console.log('2. Make GET requests to see the event loop in action');
console.log('3. Observe the execution order of operations');
console.log('4. Use Ctrl+C to stop the server\n');

// GRACEFUL SHUTDOWN
process.on('SIGINT', () => {
    console.log('\n\n=== GRACEFUL SHUTDOWN ===');
    console.log('Stopping server...');
    server.close(() => {
        console.log('Server stopped successfully');
        process.exit(0);
    });
});
