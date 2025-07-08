require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Photo = require('../models/photo'); // Adjust the path to your Photo model
const cors = require('cors');
const BinData = require('mongodb').Binary; // Import Binary from mongodb package

const app = express();
app.use(cors());
const PORT = 8080;

// Middleware
app.use(express.json({limit : '50mb'})); // Increase limit for large image uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Increase limit for large image uploads

// Connect to MongoDB
mongoose.connect(process.env.MONGODBURL);

const db = mongoose.connection;

db.on('connected', () => {
  console.log(' MongoDB connected successfully');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log(' MongoDB disconnected');
});

// Routes
app.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find();

    // Convert each photo's binary buffer to base64
    const formattedPhotos = photos.map(photo => ({
      _id: photo._id,
      title: photo.title,
      contentType: photo.contentType,
      imageBase64: `data:${photo.contentType};base64,${photo.data.toString('base64')}`
    }));

    res.json(formattedPhotos);
  } catch (err) {
    console.error('Error fetching photos:', err);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

app.get('/', async (req, res) => {
  res.send('Welcome to the Photo Upload API');
})

app.post('/upload', async (req, res) => {

  const { title, imageUrl } = req.body;
  const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
const imgBuffer = Buffer.from(base64Data, 'base64');


  try {
    const newPhoto = new Photo({ title, data : imgBuffer, contentType: 'image/png' });
    await newPhoto.save();
    res.status(201).json({ message: 'Photo saved', photo: newPhoto });
  } catch (err) {
    console.error('Error saving photo:', err);
    res.status(500).json({ error: err.message });
  }
});
  

module.exports = app;