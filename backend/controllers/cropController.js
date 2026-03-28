const aiCropService = require('../services/aiCropService');
const CropRecommendation = require('../models/CropRecommendation');

exports.getRecommendation = async (req, res) => {
    try {
        const { location, soilType, farmSize, season } = req.body;

        if (!location || !soilType || !farmSize) {
            return res.status(400).json({ message: "Please provide location, soilType, and farmSize" });
        }

        // 1. Get AI Recommendation
        const recommendation = await aiCropService.getCropRecommendation({ location, soilType, farmSize, season });

        // 2. Save logic (optional/if authenticated)
        // Assuming auth middleware populates req.user
        if (req.user) {
            // Run save in background without awaiting, to ensure fast API response time
            const record = new CropRecommendation({
                farmer: req.user.id,
                inputData: { location, soilType, farmSize, season },
                recommendation
            });
            record.save().catch(err => console.error("Crop save error (background):", err));
        }

        res.json({ recommendation });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error generating crop recommendation" });
    }
};
