const express = require('express');
const routes = express.Router();

routes.get('/', (req, res, next) => {
    res.json({ message: 'GET request to /albums' });
});

routes.post('/', (req, res, next) => {
    res.json({ message: 'POST request to /albums' });
});

routes.get('/:albumsid', (req, res, next) => {
    const albumsid = req.params.artistId;
    res.json({
        message: 'GET request to /albums/',
        id: albumsid
    });
});

routes.patch('/:albumsid', (req, res, next) => {
    const albumsid = req.params.albumsid;
    res.json({
        message: 'PATCH request to /albums/',
        id: albumsid
    });
});

routes.delete('/:albumsid', (req, res, next) => {
    const albumsid = req.params.albumsid;
    res.json({
        message: 'DELETE request to /albums/',
        id: albumsid
    });
});



module.exports = routes;