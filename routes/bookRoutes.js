const express = require('express');
const bookController = require('../controllers/bookController');
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');
const router = express.Router();

router.get('/books', bookController.getAllBooks);
router.get('/books/:isbn', bookController.getBookByISBN);
router.post('/books/:isbn/review', authenticateJWT, authorizeRole('registered'), bookController.addReview);
router.put('/books/:isbn/review/:reviewId', authenticateJWT, authorizeRole('registered'), bookController.updateReview);
router.delete('/books/:isbn/review/:reviewId', authenticateJWT, authorizeRole('registered'), bookController.deleteReview);

module.exports = router;
