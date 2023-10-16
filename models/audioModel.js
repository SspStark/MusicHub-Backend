const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  audio_file: {
    type: String, // Assuming a file path or reference to the song file
    required: true
  }
});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
