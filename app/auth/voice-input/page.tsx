"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function VoiceInputPage() {
    const [voiceData, setVoiceData] = useState("");
    const router = useRouter();

    const handleProcessVoice = async () => {
        if (voiceData) {
            localStorage.setItem("userProfile", JSON.stringify({ voiceData }));
            router.push("/profile");
        } else {
            alert("Please provide your details via voice input.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <h1 className="text-3xl font-bold">Voice Input</h1>
            <textarea
                className="border p-2 w-80"
                placeholder="Simulate voice input here..."
                value={voiceData}
                onChange={(e) => setVoiceData(e.target.value)}
            />
            <Button onClick={handleProcessVoice}>Submit Voice Data</Button>
        </div>
    );
}