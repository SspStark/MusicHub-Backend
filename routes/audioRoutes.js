const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');

router.get('/audios', audioController.getAllAudios);
router.post('/add-audio', audioController.addAudio);

module.exports = router;
