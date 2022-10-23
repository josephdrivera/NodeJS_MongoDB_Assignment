const express = require('express');
const routes = express.Router();
const Album = require('./models/album');
const mongoose = require('mongoose');
const { reset } = require('nodemon');
const album = require('./models/album');

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

    album.find({
        title: req.body.title,
        artist: req.body.artist
    })
        .exec()
        .then(result => {
            console.log(result);
            if (result.length >= 0) {
                return res.status(406).json({
                    message: 'Album already exists'
                })
            }
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

})




// GET a single album by id
routes.get('/:albumId', (req, res, next) => {
    const albumId = req.params.albumId;
    Album.findById(albumId)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        }
        );
});



// PATCH album by id
routes.patch('/:albumId', (req, res, next) => {
    const albumId = req.params.albumId;

    const updateAlbumId = {
        title: req.body.title,
        artist: req.body.artist
    };

    Album.updateOne({ _id: albumId }, { $set: updateAlbumId })
        .then(result => {
            res.status(200).json({
                message: 'Album updated',
                albums: {
                    title: result.title,
                    artist: result.artist,
                    id: result._id
                },
                metadata: {
                    method: req.method,
                    host: req.hostname,
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: err.message
                }
            });
        });
});


// DELETE album by id
routes.delete('/:albumid', (req, res, next) => {
    const albumid = req.params.albumid;
    Album.remove({ _id: albumid })
        .then(result => {
            console.log(result);
            res.status(200).json({
                album: {
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




module.exports = routes;