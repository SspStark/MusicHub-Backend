const Audio = require('../models/audioModel');

const getAllAudios = async (req, res) => {
  try {
    const audios = await Audio.find();
    res.json(audios);
  } catch (error) {
    console.error('Error fetching audios:', error);
    res.status(500).json({ error: error.message });
  }
};

const addAudio = async (req, res) => {
  const { title, song_file } = req.body;

  try {
    const audio = new Audio({ title, audio_file });
    await audio.save();
    res.status(201).json({ msg: 'Audio added successfully'});
  } catch (error) {
    console.error('Error adding audio:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAudios,
  addAudio
};
