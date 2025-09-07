const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    console.log('Main thread:', process.pid);

    // Start a worker thread
    const worker = new Worker(__filename, {
        workerData: { num: 10 }
    });

    worker.on('message', (result) => {
        console.log(`Result from worker: ${result}`);
    });

    worker.on('error', (err) => console.error('Worker error:', err));
    worker.on('exit', (code) => console.log(`Worker exited with code ${code}`));

} else {
    // Worker thread code
    const { num } = workerData;

    // Simulate heavy computation: factorial
    function factorial(n) {
        return n === 0 ? 1 : n * factorial(n - 1);
    }

    const result = factorial(num);
    parentPort.postMessage(`Factorial of ${num} is ${result}`);
}
