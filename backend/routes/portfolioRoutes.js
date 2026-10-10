const express = require('express');
const router = express.Router();
const {
  createPortfolio,
  getUserPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  togglePublishPortfolio,
  getPublicPortfolioBySlug
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

// Authenticated portfolio operations
router.route('/')
  .post(protect, createPortfolio)
  .get(protect, getUserPortfolios);

router.route('/:id')
  .get(protect, getPortfolioById)
  .put(protect, updatePortfolio)
  .delete(protect, deletePortfolio);

router.patch('/:id/publish', protect, togglePublishPortfolio);

module.exports = router;
