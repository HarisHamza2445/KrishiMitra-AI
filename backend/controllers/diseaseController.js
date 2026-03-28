const DiseaseReport = require('../models/DiseaseReport');
const aiDiseaseService = require('../services/aiDiseaseService');
const cloudinary = require('../config/cloudinary');
const stream = require('stream');

exports.analyzeCrop = async (req, res) => {
    console.log("Analyzing crop..."); // Debug log
    try {
        if (!req.file) {
            console.error("No file uploaded"); // Debug log
            return res.status(400).json({ message: "No image uploaded" });
        }
        console.log("File received:", req.file.originalname, req.file.size); // Debug log

        // 1. Upload to Cloudinary via Stream
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "krishimitra_diseases" },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary Upload Error:", error);
                            reject(error);
                        } else {
                            console.log("Cloudinary Upload Success:", result.secure_url); // Debug log
                            resolve(result);
                        }
                    }
                );
                // Create a readable stream from the buffer
                const bufferStream = new stream.PassThrough();
                bufferStream.end(req.file.buffer);
                bufferStream.pipe(uploadStream);
            });
        };

        // Run Cloudinary Upload and AI Analysis in parallel
        console.log("Starting parallel processing: AI Analysis & Cloudinary Upload...");
        const [cloudinaryResult, analysis] = await Promise.all([
            uploadToCloudinary(),
            aiDiseaseService.analyzeCropDisease(req.file.buffer, req.file.mimetype)
        ]);

        const imageUrl = cloudinaryResult.secure_url;
        console.log("Parallel processing complete");

        // 3. Save to Database in background
        const userId = req.user ? req.user.id : null;
        let reportId = null;

        if (userId) {
            // Generate ID immediately if needed by frontend
            const report = new DiseaseReport({
                farmer: userId,
                imageUrl,
                analysis
            });
            reportId = report._id;

            // Fire and forget DB save
            report.save().then(() => {
                console.log("Report saved to DB in background");
            }).catch(dbError => {
                console.error("DB Save Error (background):", dbError);
            });
        }

        // Return immediately
        res.json({
            message: "Analysis successful",
            imageUrl,
            analysis,
            reportId
        });

    } catch (error) {
        console.error("Disease Controller Error:", error);
        res.status(500).json({ message: "Server Error during disease analysis" });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const reports = await DiseaseReport.find({ farmer: req.user.id }).sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
