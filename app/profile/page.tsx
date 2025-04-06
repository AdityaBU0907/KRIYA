"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, MapPin, Clock, CheckCircle, Phone, Mail, User, Edit } from "lucide-react";
import { useLanguage } from "@/contexts/language-context"; // Make sure this path matches your project

export default function ProfilePage() {
    const { t } = useLanguage(); // <-- Get the translate function
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem("userProfile");
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

    if (!profile) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">{t("loadingProfile")}</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-6 space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">{t("workerProfile")}</h1>
                <p className="text-muted-foreground">{t("profileSubtitle")}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Profile Card */}
                <Card className="md:col-span-1">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 relative">
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                <User className="h-12 w-12 text-primary" />
                            </div>
                            <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">{t("editProfilePicture")}</span>
                            </Button>
                        </div>
                        <CardTitle>{profile.name || "N/A"}</CardTitle>
                        <CardDescription className="flex items-center justify-center">
                            <MapPin className="h-3 w-3 mr-1" /> {profile.location || "N/A"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">{t("trustScore")}</div>
                                <div className="flex items-center">
                                    <span className="font-medium mr-1">{profile.trustScore || "N/A"}</span>
                                    <div className="flex">
                                        {Array(5).fill(0).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < Math.round(profile.trustScore || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">{t("jobsCompleted")}</div>
                                <div className="font-medium">{profile.jobsCompleted || 0}</div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">{t("loyaltyPoints")}</div>
                                <div className="font-medium">{profile.loyaltyPoints || 0}</div>
                            </div>

                            <div className="pt-2">
                                <div className="flex items-center mb-2">
                                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{profile.phone || "N/A"}</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{profile.email || "N/A"}</span>
                                </div>
                            </div>

                            <Button className="w-full">
                                <Edit className="h-4 w-4 mr-2" />
                                {t("editProfile")}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Skills & Experience */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>{t("skillsExperience")}</CardTitle>
                        <CardDescription>{t("skillsExperienceSubtitle")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium mb-2">{t("primarySkills")}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.skills?.map((skill, index) => (
                                        <Badge key={index} variant="secondary">
                                            {skill}
                                        </Badge>
                                    )) || "N/A"}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">{t("workExperience")}</h3>
                                <div className="space-y-3">
                                    {profile.experience?.map((exp, index) => (
                                        <div key={index} className="border-l-2 border-primary/50 pl-4">
                                            <div className="font-medium">{exp.role}</div>
                                            <div className="text-sm">{exp.company}</div>
                                            <div className="text-xs text-muted-foreground flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {exp.duration}
                                            </div>
                                        </div>
                                    )) || "N/A"}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
