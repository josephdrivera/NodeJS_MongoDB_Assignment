const express = require('express');
const routes = express.Router();
const Album = require('./models/album');
const mongoose = require('mongoose');
const { reset } = require('nodemon');

// GET all albums
routes.get('/', (req, res, next) => {
    Album.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        }
        );
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

// GET album by id
routes.get('/:albumsid', (req, res, next) => {
    const albumsid = req.params.artistId;
    const id = req.params.albumId; // This is the id of the album
    Album.findById(id)
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Album Found',
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
            console.log(err);
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        });
});



// PATCH album by id
routes.patch('/:albumsid', (req, res, next) => {
    const albumsid = req.params.albumsid;
    const updateAlbum = {
        title: req.body.title,
        artist: req.body.artist

    };
    Album.updateOne({
        _id: albumsid
    }, { $set: updateAlbum })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Album Updated',
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
        }
        )
        .catch(err => {
            console.log(err, message);
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        }
        );
});


// DELETE album by id
routes.delete('/:albumsid', (req, res, next) => {
    const albumsid = req.params.albumsid;
    Album.remove({ _id: albumsid })
        .then(result => {
            res.status(200).json({
                message: 'Album Deleted',
                albums: {
                    id: albumsid,
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





module.exports = routes;