const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const artistRoutes = require('../api/routes/artists');
const albumRoutes = require('../api/routes/albums');


// Middleware for logging
app.use(morgan('dev'));

// Middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));

// middleware all requests are json
app.use(express.json());
// middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'service is UP ',
        method: req.method,
    });
});

app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);

//add middleware to handle errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message,
        status: error.status
    });
});

// Connect to MongoDB
mongoose.connect(process.env.mongoDBURI, (err) => {
    if (err) {
        console.error("Error: ", err.message);
    } else {
        console.log('Connected to MongoDB');
    }
});

module.exports = app;

