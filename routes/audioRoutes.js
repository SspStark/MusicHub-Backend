const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');

router.get('/audio', audioController.getAllAudios);
router.post('/audio', audioController.addAudio);

module.exports = router;
