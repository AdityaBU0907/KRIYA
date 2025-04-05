"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Redirect to Aadhar verification
        router.push("/auth/aadhar-verification");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <h1 className="text-3xl font-bold">Signup</h1>
            <div className="flex flex-col space-y-4 w-80">
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleSignup}>Sign Up</Button>
            </div>
        </div>
    );
}