const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getBookByISBN = async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.addReview = async (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;

  try {
    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).send('Book not found');

    book.reviews.push({ user: req.user._id, review });
    await book.save();
    res.status(201).send('Review added');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.updateReview = async (req, res) => {
  const { isbn, reviewId } = req.params;
  const { review } = req.body;

  try {
    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).send('Book not found');

    const bookReview = book.reviews.id(reviewId);
    if (!bookReview) return res.status(404).send('Review not found');

    bookReview.review = review;
    await book.save();
    res.send('Review updated');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.deleteReview = async (req, res) => {
  const { isbn, reviewId } = req.params;

  try {
    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).send('Book not found');

    book.reviews.id(reviewId).remove();
    await book.save();
    res.send('Review deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
};
