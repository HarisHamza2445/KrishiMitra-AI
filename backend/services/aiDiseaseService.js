const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType,
        },
    };
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const callAIWithRetry = async (fn, retries = 3, delayMs = 2000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries > 0 && (error.message.includes("503") || error.message.includes("Service Unavailable"))) {
            console.warn(`AI Service busy (503). Retrying in ${delayMs / 1000}s... (${retries} retries left)`);
            await delay(delayMs);
            return callAIWithRetry(fn, retries - 1, delayMs * 2);
        } else {
            throw error;
        }
    }
};

exports.analyzeCropDisease = async (imageBuffer, mimeType) => {
    try {
        // Use gemini-flash-lite-latest for extreme speed and guaranteed fallback
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

        const prompt = `
        You are an expert plant pathologist. Analyze this image of a crop/plant.
        Identify if there is any disease, pest, or deficiency.
        
        Provide the output in the following JSON format ONLY (do not use code blocks):
        {
            "diseaseName": "Name of the disease or 'Healthy'",
            "confidence": "High/Medium/Low",
            "description": "Brief description of the issue",
            "treatment": "Recommended cure or medicines",
            "preventiveMeasures": "How to prevent this in future"
        }
        
        If the image is not a plant, return:
        {
            "diseaseName": "Unknown",
            "confidence": "Low",
            "description": "The image does not appear to be a plant.",
            "treatment": "N/A",
            "preventiveMeasures": "N/A"
        }
        `;

        const imagePart = fileToGenerativePart(imageBuffer, mimeType);

        const result = await callAIWithRetry(async () => {
            const res = await model.generateContent([prompt, imagePart]);
            return res.response;
        });

        const text = result.text();

        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("AI Disease Analysis Error:", error);
        if (error.message.includes("503")) {
            throw new Error("AI Service is currently busy. Please try again in a moment.");
        }
        throw new Error("Failed to analyze crop disease");
    }
};
