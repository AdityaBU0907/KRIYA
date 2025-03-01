"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export default function MyJobsPage() {
  const { t } = useLanguage()
  
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("myJobs")}</h1>
        <p className="text-muted-foreground">
          {t("manageJobs")}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>{t("activeJobs")}</CardTitle>
            <CardDescription>{t("currentlyWorking")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>{t("completedJobs")}</CardTitle>
            <CardDescription>{t("successfullyFinished")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}