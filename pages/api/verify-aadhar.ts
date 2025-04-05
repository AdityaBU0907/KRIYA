import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Directly access req.body
        const { aadhar } = req.body;

        if (!aadhar || aadhar.length !== 12 || isNaN(Number(aadhar))) {
            return res.status(400).json({ verified: false, error: "Invalid Aadhar number" });
        }

        // Mock Aadhar verification logic
        if (aadhar === "123456789012") {
            return res.status(200).json({ verified: true });
        }

        return res.status(400).json({ verified: false, error: "Aadhar verification failed" });
    } catch (error) {
        console.error("Error verifying Aadhar:", error);
        return res.status(500).json({ error: "Failed to verify Aadhar" });
    }
}