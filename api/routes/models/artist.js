const mongoose = require('mongoose');

/* const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    name: {
        type: String,
        required: true
    }
}); */

const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    album: String,
    name: String
});



module.exports = mongoose.model('Artist', artistSchema);
