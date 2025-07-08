// Load environment variables early
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const Photo = require('../models/photo');

const app = express();
const PORT = process.env.PORT || 8080;
const mongoUrl = process.env.MONGODBURL || 'mongodb://localhost:27017/village-photo-circle';

// Middleware
app.use(cors());
app.use(helmet()); // Adds secure headers
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Validate MongoDB URL
if (!process.env.MONGODBURL) {
  console.error('❌ MONGODBURL is not set in environment variables.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoUrl);

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

// Routes
app.get('/', (req, res) => {
  res.send('📸 Welcome to the Photo Upload API');
});

app.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find();

    const formattedPhotos = photos.map((photo) => ({
      _id: photo._id,
      title: photo.title,
      contentType: photo.contentType,
      imageBase64: `data:${photo.contentType};base64,${photo.data.toString('base64')}`,
    }));

    res.json(formattedPhotos);
  } catch (err) {
    console.error('❌ Error fetching photos:', err);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

app.post('/upload', async (req, res) => {
  const { title, imageUrl } = req.body;

  if (!title || !imageUrl) {
    return res.status(400).json({ error: 'Title and imageUrl are required' });
  }

  try {
    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
    const imgBuffer = Buffer.from(base64Data, 'base64');

    const newPhoto = new Photo({
      title,
      data: imgBuffer,
      contentType: 'image/png', // consider dynamically extracting MIME type
    });

    await newPhoto.save();

    res.status(201).json({ message: 'Photo saved', photo: newPhoto });
  } catch (err) {
    console.error('❌ Error saving photo:', err);
    res.status(500).json({ error: 'Failed to save photo' });
  }
});

// Export for serverless (Vercel)
module.exports = app;
