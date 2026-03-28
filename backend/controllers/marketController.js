const MarketPrice = require('../models/MarketPrice');
const pricePredictionService = require('../services/pricePredictionService');

// @desc    Add daily market price
// @route   POST /api/market/add
// @access  Private (or Admin)
exports.addPrice = async (req, res) => {
    try {
        const { crop, location, price, date } = req.body;

        const marketPrice = new MarketPrice({
            crop,
            location,
            price,
            date: date || Date.now()
        });

        await marketPrice.save();

        res.status(201).json(marketPrice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get market prices and predictions
// @route   GET /api/market/:crop/:location
// @access  Private
exports.getMarketData = async (req, res) => {
    try {
        const { crop, location } = req.params;

        // Get historical data
        const history = await MarketPrice.find({ crop, location }).sort({ date: 1 });

        // Generate predictions
        const predictions = pricePredictionService.predictFuturePrices(history);

        res.json({
            crop,
            location,
            history,
            predictions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
