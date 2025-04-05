"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AadharVerificationPage() {
    const [aadhar, setAadhar] = useState("");
    const router = useRouter();

    const handleAadharVerification = async () => {
        if (!aadhar || aadhar.length !== 12 || isNaN(Number(aadhar))) {
            alert("Please enter a valid 12-digit Aadhar number.");
            return;
        }

        try {
            const response = await fetch("/api/verify-aadhar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ aadhar }),
            });

            const data = await response.json();
            if (data.verified) {
                router.push("/auth/voice-input");
            } else {
                alert(data.error || "Aadhar verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying Aadhar:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <h1 className="text-3xl font-bold">Aadhar Verification</h1>
            <Input
                placeholder="Enter Aadhar Number"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
            />
            <Button onClick={handleAadharVerification}>Verify Aadhar</Button>
        </div>
    );
}