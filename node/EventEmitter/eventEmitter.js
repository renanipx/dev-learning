const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
    // Every request will emit a "request" event internally
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node.js server with EventEmitter!\n');
});

// 1️⃣ Listen for the "request" event
server.on('request', (req, res) => {
    console.log(`[EventEmitter] Request received: ${req.method} ${req.url}`);
});

// 2️⃣ Listen for the "connection" event (new TCP connection)
server.on('connection', (socket) => {
    console.log('[EventEmitter] New TCP connection established');
});

// 3️⃣ Listen for the "close" event
server.on('close', () => {
    console.log('[EventEmitter] Server has been closed');
});

// Start server
server.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});

// Close server automatically after 15s
setTimeout(() => {
    server.close();
}, 15000);