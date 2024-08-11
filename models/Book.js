const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  review: { type: String, required: true }
});

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  reviews: [reviewSchema]
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
