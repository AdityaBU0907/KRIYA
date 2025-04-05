import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Experience = {
    role: string;
    company: string;
    duration: string;
};

type ProfileData = {
    name?: string;
    age?: string;
    location?: string;
    phone?: string;
    email?: string;
    skills?: string[];
    experience?: Experience[];
    trustScore?: number;
    jobsCompleted?: number;
    loyaltyPoints?: number;
    followUpQuestion?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { textInput } = req.body;
        console.log("🔤 Received textInput:", textInput);

        if (!textInput || typeof textInput !== "string") {
            return res.status(400).json({ error: "Missing or invalid text input" });
        }

        const profile = await queryLLaMA(textInput);
        console.log("🧠 LLaMA Profile:", profile);

        const missing = [];
        if (!profile.name) missing.push("What is your name?");
        if (!profile.age) missing.push("How old are you?");
        if (!profile.skills?.length) missing.push("What are your primary skills?");
        if (!profile.experience?.length) missing.push("Can you tell us about your past job experiences?");
        if (!profile.location) missing.push("Where are you currently located?");
        if (!profile.phone) missing.push("Please provide a contact phone number.");
        if (!profile.email) missing.push("Please provide an email address.");

        if (missing.length > 0) {
            profile.followUpQuestion = missing.join(" ");
        }

        res.status(200).json(profile);
    } catch (err: any) {
        console.error("❌ Error in processing text input:", err.message);
        res.status(500).json({
            error: "Internal server error",
            details: `Failed to call LLaMA: ${err.message}`,
        });
    }
}

async function queryLLaMA(transcription: string): Promise<ProfileData> {
    const prompt = `
You are a helpful assistant that listens to voice input from job workers in India and creates a structured profile.
Extract the following details from the transcription below:

- name
- age
- location
- phone (if any)
- email (if any)
- skills (array of relevant work skills)
- experience (list of { role, company, duration })
- trustScore (estimate between 1 to 5 based on confidence)
- jobsCompleted (if stated or can be inferred)
- loyaltyPoints (can be estimated from trust/experience if not directly mentioned)

Respond only with a valid JSON object:
Transcription: """${transcription}"""
`;

    try {
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "llama3.2", // ✅ Corrected model name
            prompt,
            stream: false,
        });

        const text = response.data.response;
        console.log("📨 LLaMA raw response:", text);

        const jsonMatch = text.match(/{[\s\S]+}/);
        if (!jsonMatch) {
            console.error("⚠️ No valid JSON found in LLaMA response:", text);
            throw new Error("Invalid response from LLaMA");
        }

        return JSON.parse(jsonMatch[0]);
    } catch (err: any) {
        console.error("🚨 Error calling LLaMA:", err.message);
        throw err;
    }
}
