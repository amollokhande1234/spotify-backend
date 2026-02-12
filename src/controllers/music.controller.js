const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken');
const uploadFile = require('../services/storage.service');
const albumModel = require('../models/album.model');


async function createMusic(req, res) {
    console.log("Hellow");
    try {
        // const { token } = req.body;

        // let verifyIsArtist;

        // try {
        //     verifyIsArtist = jwt.verify(token, process.env.JWT_SECRET);
        // } catch (err) {
        //     return res.status(401).json({ message: "Invalid or expired token" });
        // }


        // if (verifyIsArtist.role !== 'artist') {
        //     return res.status(403).json({
        //         message: "Unothorized to create music"
        //     });
        // }

        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            // artist: verifyIsArtist.id
            artist: req.user.id
        });

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                // artist: music.artist,
                artist: req.user.id
            }
        });
    } catch (e) {
        console.log("Erro " + e);
    }
}


async function getAllMusic(req, res) {
    try {
        const result = await musicModel.find({}).populate('artist');

        res.status(200).json({
            message: "all music fetched",
            data: result
        });

    } catch (e) {
        console.log(e);

    }
}



module.exports = { createMusic, getAllMusic, }