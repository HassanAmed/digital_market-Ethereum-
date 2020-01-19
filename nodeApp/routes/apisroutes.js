const express = require('express');
const author = require('../controllers/authorController');
const reader = require('../controllers/readerController');
const router = express.Router();

// author apis
router.post('/regAuthor', author.setAuthor);
router.post('/publish', author.publishBook);
router.get('/auhtorBooks', author.getAuthBooks);
router.get('/publishedBooks', author.allPublishedBooks);
router.get('/getAuthorByID', author.getAuthorById);
// reader apis
router.post('/regReader', reader.setReader);
router.post('/purchase', reader.purchaseBook);
router.post('/resell', reader.resell);
router.get('/readerBooks', reader.getReaderBooks);
router.get('/purchasedBooks', reader.allPurchasedBooks);
router.get('/getReaderByID', reader.getReaderById);
module.exports = router;
