const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1', // Update with your AWS region
  accessKeyId: 'AKIA5EGZNREIWKT7KZOF',
  secretAccessKey: 'I6ObpMJUTH/XKgMaKQ34uwbgDpudvUmdlONP1Fdp',
});

const Polly = new AWS.Polly();

router.post('/tts', async (req, res) => {
  const { text } = req.body;
  const params = {
    OutputFormat: 'mp3',
    Text: text,
    TextType: 'text',
    VoiceId: 'Joanna', // Choose a voice ID from Polly's available voices
  };

  try {
    Polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.error('Error synthesizing speech:', err);
        res.status(500).json({ error: 'Error synthesizing speech' });
      } else {
        res.status(200).send(data.AudioStream);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;