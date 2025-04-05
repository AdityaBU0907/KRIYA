"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Mock login logic
        if (email === "test@example.com" && password === "password123") {
            router.push("/profile");
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <h1 className="text-3xl font-bold">Login</h1>
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
                <Button onClick={handleLogin}>Login</Button>
            </div>
        </div>
    );
}