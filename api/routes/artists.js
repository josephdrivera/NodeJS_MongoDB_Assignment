const express = require('express');
const Artist = require('./models/artist');
const mongoose = require('mongoose');
const routes = express.Router();

routes.get('/', (req, res, next) => {
    Artist.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        }
        );
});
// post a new artist
routes.post('/', (req, res, next) => {

    Artist.find({
        name: req.body.name,
        album: req.body.album
    })
        .exec()
        .then(result => {
            if (result.length >= 0) {
                return res.status(409).json({
                    message: 'Artist already exists'
                })
            }
            const newArtist = new Artist({
                _id: new mongoose.Types.ObjectId(),
                album: req.body.album,
                name: req.body.name
            });
            // Save the new artist to the database
            newArtist.save()
                .then(result => {
                    console.log(result);
                    res.json(result);
                    res.status(201).json({
                        message: 'Artist created',
                        artist: {
                            id: result._id,
                            album: result.album,
                            name: result.name,
                            metadata: {
                                method: req.method,
                                host: req.hostname
                            }
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: {
                            message: "Artist not created"
                        }
                    });
                });

        })
});
// get a single artist
routes.get('/:artistId', (req, res, next) => {
    const artistId = req.params.artistId;
    Artist.findById(artistId)
        .select('name _id')
        .populate('album')
        .exec()
        .then(artist => {
            if (!artist) {
                return res.status(404).json({
                    message: 'Artist not found'
                });
            }
            res.status(201).json({
                artist: artist,
            })
        })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: err.message,
                }
            });
        });
});
// update a single artist
routes.patch('/:artistId', (req, res, next) => {
    const artistId = req.params.artistId;
    const updateAlbumId = {
        album: req.body.album,
        name: req.body.name
    };
    Artist.updateOne({ _id: artistId }, { $set: updateAlbumId })
        .then(result => {
            res.status(201).json({
                message: 'Artist updated',
                artist: {
                    id: result._id,
                    album: result.album,
                    name: result.name,
                    metadata: {
                        method: req.method,
                        host: req.hostname
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: err.message,
                }
            });
        }
        );
});
// delete a single artist
routes.delete('/:artistId', (req, res, next) => {
    const artistId = req.params.artistId;

    Artist.deleteOne({
        _id: artistId
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Artist deleted',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/artists/' + artistId
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: err.message,
                }
            })
        })
})


module.exports = routes;