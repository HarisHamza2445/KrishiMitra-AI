const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

exports.getCropRecommendation = async (inputData) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

        const prompt = `
        You are an agricultural expert. Based on the following data, recommend the best crop to grow and provide a brief farming guide:
        
        Location: ${inputData.location}
        Soil Type: ${inputData.soilType}
        Farm Size: ${inputData.farmSize}
        Season: ${inputData.season || "Current season"}
        
        Please provide a concise recommendation including:
        1. Recommended Crop
        2. Expected Yield
        3. Key Tips for cultivation
        `;

        const result = await callAIWithRetry(async () => {
            const res = await model.generateContent(prompt);
            return res.response;
        });

        return result.text();
    } catch (error) {
        console.error("AI Service Error:", error);
        if (error.message.includes("503")) {
            throw new Error("AI Service is currently busy. Please try again in a moment.");
        }
        throw new Error("Failed to generate AI recommendation");
    }
};
