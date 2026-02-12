const albumModel = require('../models/album.model');
const jwt = require('jsonwebtoken');

async function createAlbum(req, res) {
    try {

        const { title, musicId, token, } = req.body;

        // check is user or artist
        let isArtist;
        try {
            isArtist = jwt.verify(token, process.env.JWT_SECRET);
            if (isArtist.role !== 'artist') {
                return res.status(403).json({
                    message: "Unothorized to create album"
                });
            }

            console.log(isArtist + "\n" + title);

            const album = await albumModel.create({
                title: title,
                musics: musicId,
                // artist: isArtist.id,
                artist: req.user.id
            });

            res.status(201).json({
                message: "Album created successfully ",
                album,
            });
        } catch (e) {
            console.log(e);
            return res.status(403).json({
                message: "Some thing went wrong ",
                e
            });
        }

    } catch (e) {
        console.log("Error in Album " + e);

    }
}

async function getAllAlbum(reqq, res) {
    try {
        const result = await albumModel.find({}).populate("musics");
        res.status(200).json({ message: "Album Fetch Successfully", data: result });
    } catch (e) {
        console.log("Get all Album Erro " + e);
        res.status(509).json({ message: "Something went wrong", data: [] });
    }
}



async function getAlbumById(req, res) {
    try {
        const { albumId } = req.body;
        const result = await albumModel.findById({ _id: albumId });


        if (result == null) {
            res.status(409).json({
                message: "Album Id is wrong , Faild to fetech album"
            });
        }

        res.status(200).json({
            message: "Fetched album successfully",
            data: result,
        });

    } catch (e) {
        console.log("Get Album By Id Error " + e);
        res.status(509).json({ message: "Something went wrong", data: [] });
    }
}
module.exports = { createAlbum, getAllAlbum, getAlbumById };