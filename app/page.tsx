"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Briefcase, Star, Wallet, TrendingUp, Award, Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function Dashboard() {
  const { t } = useLanguage()
  
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("welcomeBack", {name: "Rahul"})}</h1>
        <p className="text-muted-foreground">{t("dashboardOverview")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("trustScore")}</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <p className="text-xs text-muted-foreground"></p>
            <Progress className="mt-3" value={96} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("earnings")}</CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹27,650</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("activeJobs")}</CardTitle>
            <Briefcase className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">{t("jobCategories", {categories: "Construction (1), Delivery (1)"})}</p>
            <div className="mt-3">
              <Link href="/my-jobs">
                <Button size="sm" variant="outline" className="w-full">
                  {t("viewJobs")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>{t("recentActivity")}</CardTitle>
              <Button variant="link" size="sm" className="text-sm">{t("viewAll")}</Button>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Applied for delivery partner role at Flipkart</p>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                <Award className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Accepted at Zomato, as a delivery partner</p>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Yesterday
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>{t("profileProgress")}</CardTitle>
            <CardDescription>{t("completeProfile")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>75% Complete</span>
                <span className="text-muted-foreground">6/8</span>
              </div>
              <Progress value={75} />
            </div>
            <Button className="w-full">{t("improveProfile")}</Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-6">{t("recommendedJobs")}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {recommendedJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{job.title}</CardTitle>
                <Badge variant={job.premium ? "default" : "secondary"}>
                  {job.premium ? t("premium") : t("regular")}
                </Badge>
              </div>
              <CardDescription>
                {job.company} • {job.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 text-sm mb-4">
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center">
                  <Wallet className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>₹{job.salary}</span>
                </div>
                <div className="flex items-center">
                  <Award className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>+{job.points} points</span>
                </div>
              </div>
              <Button className="w-full">
                <Link href="/job-search">{t("exploreJobs")}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const recommendedJobs = [
  {
    id: 1,
    title: "Construction Worker",
    company: "Delhi Metro Corp",
    location: "Delhi NCR",
    duration: "3 months",
    salary: "25,000/month",
    points: 500,
    premium: true,
  },
  {
    id: 2,
    title: "Delivery Associate",
    company: "QuickMart",
    location: "Gurgaon",
    duration: "Flexible",
    salary: "20,000/month",
    points: 300,
    premium: false,
  }
]