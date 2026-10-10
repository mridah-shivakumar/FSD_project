const express = require('express');
const router = express.Router();
const { getPublicPortfolioBySlug } = require('../controllers/portfolioController');

// Public route to view published portfolios without login
router.get('/portfolios/:slug', getPublicPortfolioBySlug);

module.exports = router;
