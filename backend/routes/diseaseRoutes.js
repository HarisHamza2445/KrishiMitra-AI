const express = require('express');
const router = express.Router();
const diseaseController = require('../controllers/diseaseController');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming this exists from previous phases

const auth = require('../middleware/authMiddleware');

// Route to analyze crop disease
// POST /api/disease/analyze
// Private access
router.post('/analyze', (req, res, next) => {
    console.log("Disease Analyze Route Hit. Headers:", req.headers['content-type']);
    next();
}, auth, upload.single('image'), diseaseController.analyzeCrop);

// Route to get user's disease report history
// GET /api/disease/history
// Private access
router.get('/history', auth, diseaseController.getHistory);

module.exports = router;

