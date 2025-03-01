"use client"

import React, { useEffect } from "react"
import { Check, Globe, Moon, Sun, User } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"
import { useLanguage, languages } from "@/contexts/language-context"

export default function SettingsPage() {
    const { toast } = useToast()
    const { theme, setTheme } = useTheme()
    const { language, setLanguage, t } = useLanguage()

    // Update theme state when component mounts to get the current system theme
    useEffect(() => {
        // No action needed as next-themes handles this
    }, [])

    const saveSettings = () => {
        toast({
            title: t("saved"),
            description: t("savedDescription"),
        })
    }

    return (
        <div className="flex flex-col p-6 space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">{t("settings")}</h1>
                <p className="text-muted-foreground">
                    {t("manageAccount")}
                </p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
                    <TabsTrigger value="general">{t("general")}</TabsTrigger>
                    <TabsTrigger value="appearance">{t("appearance")}</TabsTrigger>
                    <TabsTrigger value="account">{t("account")}</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("language")}</CardTitle>
                            <CardDescription>
                                {t("chooseLanguage")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <Label htmlFor="language">{t("selectLanguage")}</Label>
                                </div>
                                <Select
                                    value={language}
                                    onValueChange={setLanguage}
                                >
                                    <SelectTrigger className="w-full max-w-xs">
                                        <SelectValue placeholder={t("selectLanguage")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>{t("language")}</SelectLabel>
                                            {Object.entries(languages).map(([code, name]) => (
                                                <SelectItem key={code} value={code}>
                                                    {name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col space-y-1">
                                    <Label htmlFor="notifications">{t("notifications")}</Label>
                                    <span className="text-sm text-muted-foreground">
                                        {t("jobAlerts")}
                                    </span>
                                </div>
                                <Switch id="notifications" defaultChecked />
                            </div>

                            <Separator />

                            <Button onClick={saveSettings}>{t("savePreferences")}</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("themeSettings")}</CardTitle>
                            <CardDescription>{t("customize")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {theme === "light" ? (
                                            <Sun className="h-5 w-5 text-amber-500" />
                                        ) : (
                                            <Moon className="h-5 w-5 text-indigo-500" />
                                        )}
                                        <div className="flex flex-col">
                                            <Label>{t("themeMode")}</Label>
                                            <span className="text-sm text-muted-foreground">
                                                {theme === "light" ? t("lightMode") : t("darkMode")}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant={theme === "light" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setTheme("light")}
                                            className="w-24"
                                        >
                                            {t("light")}
                                        </Button>
                                        <Button
                                            variant={theme === "dark" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setTheme("dark")}
                                            className="w-24"
                                        >
                                            {t("dark")}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <Button onClick={saveSettings}>{t("savePreferences")}</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("accountInfo")}</CardTitle>
                            <CardDescription>{t("personalDetails")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted">
                                    <User className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-medium">Rahul Singh</p>
                                    <p className="text-sm text-muted-foreground">rahul.s@example.com</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-2">
                                <Button variant="outline" className="w-full">{t("editProfile")}</Button>
                                <Button variant="outline" className="w-full">{t("changePassword")}</Button>
                                <Button variant="destructive" className="w-full">{t("deleteAccount")}</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <Toaster />
        </div>
    )
}