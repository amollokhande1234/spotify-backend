const express = require('express');
const musicController = require('../controllers/music.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create_music', musicController.createMusic);
router.get('/', authMiddleware.authUser, musicController.getAllMusic);



module.exports = router;