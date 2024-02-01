const Audio = require('../models/audioModel');

const getAllAudios = async (req, res) => {
  try {
    const audios = await Audio.find();
    const audioData = audios.map(audio => {
      return {
        id:audio._id,
        title: audio.title,
        artist:audio.artist,
        image_url:audio.image_url,
        audioUrl: `https://${req.headers.host}/audio/${encodeURIComponent(audio.audio_file)}`
      };
    });
    res.json(audioData);
  } catch (error) {
    console.error('Error fetching audios:', error);
    res.status(500).json({ error: error.message });
  }
};

const addAudio = async (req, res) => {
  const { title, artist, image_url, audio_file } = req.body;

  try {
    const audio = new Audio({ title, artist, image_url, audio_file});
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
