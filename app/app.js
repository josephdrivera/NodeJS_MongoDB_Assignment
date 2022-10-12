const express = require('express');
const app = express();
const morgan = require('morgan');

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

module.exports = app;
