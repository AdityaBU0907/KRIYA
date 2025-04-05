"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <h1 className="text-3xl font-bold">Welcome to Perfect Jobs</h1>
            <p className="text-lg text-gray-600">Find your perfect job with ease.</p>
            <div className="flex space-x-4">
                <Button onClick={() => router.push("/auth/signup")}>New User</Button>
                <Button onClick={() => router.push("/auth/login")}>Login</Button>
            </div>
        </div>
    );
}