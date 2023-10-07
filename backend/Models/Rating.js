const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

mongoose.models = {};
const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;