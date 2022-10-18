const express = require('express');
const routes = express.Router();
const Album = require('./models/album');
const mongoose = require('mongoose');


routes.get('/', (req, res, next) => {
    res.json({ message: 'GET request to /albums' });
});

routes.post('/', (req, res, next) => {
    const newAlbum = new Album({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        artist: req.body.artist
    });
    // Save the new album to the database
    newAlbum.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Album Created',
                albums: {
                    title: result.title,
                    artist: result.artist,
                    id: result._id,
                    metadata: {
                        method: req.method,
                        host: req.hostname,
                    }
                }
            })
        })
        .catch(err => {
            console.log(err, message);
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        });
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