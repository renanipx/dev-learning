// middleware_demo.js

// ===========================
// Express Middleware Example
// ===========================

const express = require('express');
const app = express();

// Built-in middleware to parse JSON
app.use(express.json());

// 1️⃣ Custom middleware - Logger
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // move to the next middleware or route handler
}

// 2️⃣ Custom middleware - Authentication simulation
function auth(req, res, next) {
    const token = req.headers['authorization'];
    if (token === 'mysecrettoken') {
        console.log('User authenticated');
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

// Apply logger middleware globally
app.use(logger);

// Apply auth middleware only to protected routes
app.get('/public', (req, res) => {
    res.json({ message: 'This is a public route' });
});

app.get('/private', auth, (req, res) => {
    res.json({ message: 'This is a private route - access granted!' });
});

// 3️⃣ Error-handling middleware (must have 4 params)
app.use((err, req, res, next) => {
    console.error('Error caught by middleware:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
