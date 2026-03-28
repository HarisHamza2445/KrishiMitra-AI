const mongoose = require('mongoose');

const DiseaseReportSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    analysis: {
        diseaseName: { type: String },
        confidence: { type: String },
        description: { type: String },
        treatment: { type: String },
        preventiveMeasures: { type: String }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DiseaseReport', DiseaseReportSchema);
