const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/study_planner')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error: ', err));

// Test Route
app.get('/', (req, res) => {
    res.send('Backend Server is Running.');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});