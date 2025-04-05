import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { voiceData } = req.body;

        if (!voiceData) {
            return res.status(400).json({ error: "Missing or invalid voice data" });
        }

        // Call Gemini API to process voice data
        const response = await axios.post(
            "https://api.gemini.com/v1/voice-processing", // Replace with the actual Gemini API endpoint
            { input: voiceData },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const profileData = response.data; // Assume the API returns a structured profile object
        res.status(200).json(profileData);
    } catch (error) {
        console.error("Error processing voice input:", error);
        res.status(500).json({ error: "Failed to process voice input" });
    }
}