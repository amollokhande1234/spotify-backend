const express = require('express');
const albumController = require('../controllers/album.controller');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({
    storage: multer.memoryStorage(),
});


const router = express.Router();

router.post('/create-album', authMiddleware.authArtist, upload.single('musics'), albumController.createAlbum);
router.get('/', authMiddleware.authArtist, albumController.getAllAlbum);
router.get('/getAlbumById', authMiddleware.authArtist, albumController.getAlbumById);

module.exports = router;
