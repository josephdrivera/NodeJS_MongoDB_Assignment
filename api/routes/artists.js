const express = require('express');
const routes = express.Router();

routes.get('/', (req, res, next) => {
    res.json({ message: 'GET request to /artists' });
});

routes.post('/', (req, res, next) => {
    res.json({ message: 'POST request to /artists' });
});

routes.get('/:artistId', (req, res, next) => {
    const artistId = req.params.artistId;
    res.json({
        message: 'GET request to /artists/',
        id: artistId
    });
});

routes.patch('/:artistId', (req, res, next) => {
    const artistId = req.params.artistId;
    res.json({
        message: 'PATCH request to /artists/',
        id: artistId
    });
});

routes.delete('/:artistId', (req, res, next) => {
    const artistId = req.params.artistId;
    res.json({
        message: 'DELETE request to /artists/',
        id: artistId
    });
});



module.exports = routes;