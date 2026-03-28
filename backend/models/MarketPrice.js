const mongoose = require('mongoose');

const MarketPriceSchema = new mongoose.Schema({
    crop: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MarketPrice', MarketPriceSchema);
