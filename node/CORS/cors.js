// ===========================
// CORS Demo in Node.js/Express
// ===========================

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// ---------------------------
// 1️⃣ Enable CORS for all origins (development/testing)
// ---------------------------
app.use(cors());

// Example public route
app.get('/public', (req, res) => {
    res.json({ message: 'Accessible from any origin' });
});

// ---------------------------
// 2️⃣ Enable CORS only for specific origins
// ---------------------------
const allowedOrigins = ['http://localhost:3000', 'https://myfrontend.com'];

app.use('/restricted', cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow request
        } else {
            callback(new Error('Not allowed by CORS')); // Block request
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/restricted/data', (req, res) => {
    res.json({ message: 'Accessible only from allowed origins' });
});

// ---------------------------
// Error handling middleware for CORS errors
// ---------------------------
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({ error: err.message });
    } else {
        next(err);
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
