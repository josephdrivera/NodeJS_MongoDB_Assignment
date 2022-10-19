const express = require('express');
const routes = express.Router();
const Album = require('./models/album');
const mongoose = require('mongoose');

// GET all albums
routes.get('/', (req, res, next) => {
    Album.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
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
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
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