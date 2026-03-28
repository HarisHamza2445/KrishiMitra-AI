const mongoose = require("mongoose");

const CropRecommendationSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    inputData: {
        type: Object, // Stores location, soilType, farmSize, season, etc.
        required: true
    },
    recommendation: {
        type: String, // The AI-generated advice
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("CropRecommendation", CropRecommendationSchema);
