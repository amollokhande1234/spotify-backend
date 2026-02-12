const mongoose = require('mongoose')

const albumSchmea = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    musics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "music",
        }
    ],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
});

const albumModel = mongoose.model('album', albumSchmea);

module.exports = albumModel;