const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth, marketController.addPrice);
router.get('/:crop/:location', auth, marketController.getMarketData);

module.exports = router;
