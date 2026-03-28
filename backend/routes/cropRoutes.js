const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/crops/recommend
// @desc    Get AI crop recommendation
// @access  Private (Can be public if auth removed)
router.post('/recommend', auth, cropController.getRecommendation);

module.exports = router;
