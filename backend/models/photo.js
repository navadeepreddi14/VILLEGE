const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
  {
    title: String,
    data : Buffer,
    contentType: String,
  },
  { timestamps: true } // 🔥 This adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model('photos', photoSchema);
