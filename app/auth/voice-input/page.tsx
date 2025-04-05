"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function VoiceInputPage() {
    const [textInput, setTextInput] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleProcessVoice = async () => {
        if (!textInput.trim()) {
            alert("Please provide your details via voice input.");
            return;
        }

        setLoading(true);
        console.log("🔁 Sending voice data to API...");

        try {
            const response = await fetch("/api/process-voice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ textInput }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("❌ API error:", result);
                alert("Failed to process voice input.");
                return;
            }

            console.log("✅ Received processed profile:", result);

            localStorage.setItem("userProfile", JSON.stringify(result));
            router.push("/profile");
        } catch (error) {
            console.error("❌ Client error:", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <h1 className="text-3xl font-bold">Voice Input</h1>
            <textarea
                className="border p-2 w-80"
                placeholder="Simulate voice input here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={6}
            />
            <Button onClick={handleProcessVoice} disabled={loading}>
                {loading ? "Processing..." : "Submit Voice Data"}
            </Button>
        </div>
    );
}