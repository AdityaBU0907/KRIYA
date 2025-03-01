"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mic, Search, MapPin, Clock, Wallet, Award, Briefcase } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"

export default function JobSearchPage() {
  const [isListening, setIsListening] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockJobs | null>(null)
  const { toast } = useToast()
  const { t } = useLanguage()

  // Mock function to simulate voice recognition
  const handleVoiceSearch = () => {
    setIsListening(true)

    // Simulate voice processing delay
    setTimeout(() => {
      // Simulate receiving voice input
      const voiceQueries = ["Construction work in Delhi", "Delivery jobs in Gurgaon", "Part-time work in Noida"]
      const randomQuery = voiceQueries[Math.floor(Math.random() * voiceQueries.length)]
      setSearchQuery(randomQuery)
      setIsListening(false)

      // Simulate search
      handleSearch(randomQuery)

      toast({
        title: "Voice input processed",
        description: `Searching for: "${randomQuery}"`,
      })
    }, 2000)
  }

  // Mock function to simulate search
  const handleSearch = (query = searchQuery) => {
    // Simulate API call delay
    setTimeout(() => {
      // Filter mock jobs based on query
      const filteredJobs = mockJobs.filter((job) => {
        const searchTerms = query.toLowerCase()
        return (
          job.title.toLowerCase().includes(searchTerms) ||
          job.location.toLowerCase().includes(searchTerms) ||
          job.type.toLowerCase().includes(searchTerms) ||
          job.company.toLowerCase().includes(searchTerms)
        )
      })

      setSearchResults(filteredJobs.length > 0 ? filteredJobs : mockJobs)
    }, 500)
  }

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("findYourNextJob")}</h1>
        <p className="text-muted-foreground">
          {t("useVoiceSearch")}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("searchJobs")}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="relative" onClick={handleVoiceSearch} disabled={isListening}>
                {isListening && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-primary/20"></span>
                    <span className="absolute inline-flex h-3/4 w-3/4 animate-pulse rounded-full bg-primary/40 delay-150"></span>
                  </span>
                )}
                <Mic className={`h-4 w-4 ${isListening ? "text-primary" : ""}`} />
                <span className="ml-2">{t("voiceSearch")}</span>
              </Button>
              <Button onClick={() => handleSearch()}>
                <Search className="h-4 w-4 mr-2" />
                {t("search")}
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("Construction")}>
              {t("construction")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("Delivery")}>
              {t("delivery")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("Delhi")}>
              {t("delhi")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("Part-time")}>
              {t("partTime")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("Warehouse")}>
              {t("warehouse")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">
          {searchResults 
            ? t("searchResults", { count: searchResults.length.toString() }) 
            : t("recommendedJobs")}
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(searchResults || mockJobs).map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription className="mt-1">{job.company}</CardDescription>
                  </div>
                  {job.premium && <Badge>{t("premium")}</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{job.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>₹{job.salary}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("loyaltyPoints", { count: job.points.toString() })}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1">{t("applyNow")}</Button>
                  <Button variant="outline" className="flex-1">
                    {t("details")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const mockJobs = [
  {
    id: 1,
    title: "Construction Worker",
    company: "Delhi Metro Corp",
    location: "Delhi NCR",
    type: "Full-time",
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
    type: "Flexible",
    duration: "Ongoing",
    salary: "20,000/month",
    points: 300,
    premium: false,
  },
  {
    id: 3,
    title: "Warehouse Helper",
    company: "BigStore Logistics",
    location: "Noida",
    type: "Full-time",
    duration: "6 months",
    salary: "18,000/month",
    points: 450,
    premium: false,
  },
  {
    id: 4,
    title: "Office Assistant",
    company: "TechStart Inc",
    location: "Delhi",
    type: "Part-time",
    duration: "Ongoing",
    salary: "15,000/month",
    points: 350,
    premium: true,
  },
  {
    id: 5,
    title: "Security Guard",
    company: "SecureLife",
    location: "Gurgaon",
    type: "Shifts",
    duration: "1 year",
    salary: "22,000/month",
    points: 400,
    premium: false,
  },
  {
    id: 6,
    title: "Housekeeping Staff",
    company: "CleanPro Services",
    location: "Delhi NCR",
    type: "Part-time",
    duration: "Ongoing",
    salary: "16,000/month",
    points: 300,
    premium: true,
  },
  {
    id: 7,
    title: "Delivery Executive",
    company: "SwiftDeliver",
    location: "Mumbai",
    type: "Full-time",
    duration: "Ongoing",
    salary: "18,000/month",
    points: 320,
    premium: false
  },
  {
    id: 8,
    title: "Warehouse Helper",
    company: "LogiTrust",
    location: "Bangalore",
    type: "Shifts",
    duration: "6 months",
    salary: "17,000/month",
    points: 310,
    premium: false
  },
  {
    id: 9,
    title: "Gardener",
    company: "GreenScape",
    location: "Pune",
    type: "Part-time",
    duration: "Ongoing",
    salary: "15,000/month",
    points: 280,
    premium: true
  },
  {
    id: 10,
    title: "Electrician Helper",
    company: "PowerFix",
    location: "Chennai",
    type: "Contract",
    duration: "3 months",
    salary: "19,000/month",
    points: 350,
    premium: false
  },
  {
    id: 11,
    title: "Construction Labourer",
    company: "BuildStrong",
    location: "Hyderabad",
    type: "Full-time",
    duration: "1 year",
    salary: "20,000/month",
    points: 370,
    premium: false
  },
  {
    id: 12,
    title: "Kitchen Helper",
    company: "FoodMate",
    location: "Delhi",
    type: "Shifts",
    duration: "Ongoing",
    salary: "14,500/month",
    points: 290,
    premium: true
  },
  {
    id: 13,
    title: "Driver",
    company: "FastRide",
    location: "Mumbai",
    type: "Full-time",
    duration: "2 years",
    salary: "25,000/month",
    points: 450,
    premium: false
  },
  {
    id: 14,
    title: "Plumber Assistant",
    company: "AquaFix",
    location: "Chennai",
    type: "Contract",
    duration: "4 months",
    salary: "18,000/month",
    points: 340,
    premium: false
  },
  {
    id: 15,
    title: "Carpenter Helper",
    company: "WoodWorks",
    location: "Bangalore",
    type: "Shifts",
    duration: "6 months",
    salary: "19,500/month",
    points: 360,
    premium: true
  },
  {
    id: 16,
    title: "Farm Labourer",
    company: "AgriGrow",
    location: "Punjab",
    type: "Seasonal",
    duration: "3 months",
    salary: "16,000/month",
    points: 300,
    premium: false
  },
  {
    id: 17,
    title: "Hotel Cleaner",
    company: "StayClean",
    location: "Goa",
    type: "Full-time",
    duration: "Ongoing",
    salary: "15,500/month",
    points: 310,
    premium: false
  },
  {
    id: 18,
    title: "Street Vendor Assistant",
    company: "Local Bazaar",
    location: "Delhi",
    type: "Part-time",
    duration: "Ongoing",
    salary: "12,000/month",
    points: 250,
    premium: false
  },
  {
    id: 19,
    title: "Garbage Collector",
    company: "Urban Clean",
    location: "Kolkata",
    type: "Full-time",
    duration: "Ongoing",
    salary: "18,500/month",
    points: 340,
    premium: true
  },
  {
    id: 20,
    title: "Factory Worker",
    company: "IndustriCore",
    location: "Ahmedabad",
    type: "Shifts",
    duration: "1 year",
    salary: "20,000/month",
    points: 380,
    premium: false
  },
  {
    id: 21,
    title: "Painter Assistant",
    company: "ColorCreations",
    location: "Jaipur",
    type: "Contract",
    duration: "3 months",
    salary: "17,500/month",
    points: 320,
    premium: false
  },
  {
    id: 22,
    title: "Laundry Worker",
    company: "FreshPress",
    location: "Bangalore",
    type: "Full-time",
    duration: "Ongoing",
    salary: "15,000/month",
    points: 290,
    premium: true
  },
  {
    id: 23,
    title: "Rickshaw Puller",
    company: "CityRide",
    location: "Lucknow",
    type: "Self-employed",
    duration: "Ongoing",
    salary: "Varies",
    points: 270,
    premium: false
  },
  {
    id: 24,
    title: "Warehouse Packer",
    company: "QuickShip",
    location: "Hyderabad",
    type: "Shifts",
    duration: "Ongoing",
    salary: "19,000/month",
    points: 360,
    premium: false
  },
  {
    id: 25,
    title: "Street Cleaner",
    company: "CleanCity",
    location: "Chandigarh",
    type: "Full-time",
    duration: "Ongoing",
    salary: "17,000/month",
    points: 330,
    premium: true
  },
  {
    id: 26,
    title: "Petrol Pump Attendant",
    company: "FuelUp",
    location: "Nagpur",
    type: "Shifts",
    duration: "1 year",
    salary: "18,000/month",
    points: 340,
    premium: false
  },
  {
    id: 27,
    title: "Road Construction Worker",
    company: "InfraBuild",
    location: "Bhopal",
    type: "Full-time",
    duration: "1 year",
    salary: "19,000/month",
    points: 350,
    premium: false
  },
  {
    id: 28,
    title: "Sanitation Worker",
    company: "UrbanSanitize",
    location: "Patna",
    type: "Full-time",
    duration: "Ongoing",
    salary: "17,500/month",
    points: 320,
    premium: true
  },
  {
    id: 29,
    title: "Tea Stall Helper",
    company: "QuickTea",
    location: "Kolkata",
    type: "Part-time",
    duration: "Ongoing",
    salary: "13,000/month",
    points: 280,
    premium: false
  },
  {
    id: 30,
    title: "Office Boy",
    company: "BizAssist",
    location: "Delhi",
    type: "Full-time",
    duration: "Ongoing",
    salary: "15,000/month",
    points: 300,
    premium: false
  },
  {
    id: 31,
    title: "Cycle Mechanic",
    company: "CityWheels",
    location: "Bangalore",
    type: "Contract",
    duration: "6 months",
    salary: "16,500/month",
    points: 310,
    premium: false
  },
  {
    id: 32,
    title: "Street Food Vendor",
    company: "Tasty Bites",
    location: "Mumbai",
    type: "Self-employed",
    duration: "Ongoing",
    salary: "Varies",
    points: 290,
    premium: false
  },
  {
    id: 33,
    title: "Rickshaw Driver",
    company: "CityRide",
    location: "Varanasi",
    type: "Self-employed",
    duration: "Ongoing",
    salary: "Varies",
    points: 270,
    premium: false
  },
  {
    id: 34,
    title: "Cobbler",
    company: "StreetFix",
    location: "Jaipur",
    type: "Self-employed",
    duration: "Ongoing",
    salary: "Varies",
    points: 260,
    premium: false
  },
  {
    id: 35,
    title: "Brick Kiln Worker",
    company: "BrickMakers",
    location: "Lucknow",
    type: "Full-time",
    duration: "1 year",
    salary: "18,000/month",
    points: 340,
    premium: false
  },
  {
    id: 36,
    title: "Milk Delivery Boy",
    company: "FreshDairy",
    location: "Chennai",
    type: "Early Morning Shifts",
    duration: "Ongoing",
    salary: "14,000/month",
    points: 280,
    premium: true
  },
  {
    id: 37,
    title: "Fisherman",
    company: "CoastalCatch",
    location: "Kerala",
    type: "Seasonal",
    duration: "6 months",
    salary: "Varies",
    points: 330,
    premium: false
  },
  {
    id: 38,
    title: "Vegetable Seller Assistant",
    company: "FreshFarm",
    location: "Ahmedabad",
    type: "Part-time",
    duration: "Ongoing",
    salary: "13,500/month",
    points: 270,
    premium: false
  },
  {
    id: 39,
    title: "Hotel Waiter",
    company: "Royal Dine",
    location: "Mumbai",
    type: "Shifts",
    duration: "Ongoing",
    salary: "16,000/month",
    points: 300,
    premium: true
  },
  {
    id: 40,
    title: "Paan Shop Helper",
    company: "Betel Bliss",
    location: "Bihar",
    type: "Part-time",
    duration: "Ongoing",
    salary: "12,000/month",
    points: 250,
    premium: false
  },
  {
    id: 41,
    title: "Movers & Packers Labour",
    company: "ShiftEase",
    location: "Delhi NCR",
    type: "Contract",
    duration: "3 months",
    salary: "19,500/month",
    points: 340,
    premium: false
  },
  {
    id: 42,
    title: "Groundskeeper",
    company: "GreenEstate",
    location: "Pune",
    type: "Full-time",
    duration: "Ongoing",
    salary: "16,500/month",
    points: 310,
    premium: true
  },
  {
    id: 43,
    title: "Auto Rickshaw Driver",
    company: "UrbanCommute",
    location: "Hyderabad",
    type: "Self-employed",
    duration: "Ongoing",
    salary: "Varies",
    points: 300,
    premium: false
  },
  {
    id: 44,
    title: "Cleaner (Railway Station)",
    company: "RailClean",
    location: "Kolkata",
    type: "Shifts",
    duration: "Ongoing",
    salary: "17,000/month",
    points: 330,
    premium: false
  },
  {
    id: 45,
    title: "Sewing Machine Operator",
    company: "StitchPro",
    location: "Ludhiana",
    type: "Full-time",
    duration: "1 year",
    salary: "19,000/month",
    points: 350,
    premium: false
  },
  {
    id: 46,
    title: "Balloon Seller",
    company: "StreetJoy",
    location: "Mumbai",
    type: "Self-employed",
    duration: "Ongoing",
    salary: "Varies",
    points: 250,
    premium: false
  },
  {
    id: 47,
    title: "Scrap Collector",
    company: "RecycleIndia",
    location: "Delhi",
    type: "Self-employed",
    duration: "Ongoing",
    salary: "Varies",
    points: 280,
    premium: false
  },
  {
    id: 48,
    title: "Junkyard Worker",
    company: "MetalScrap",
    location: "Chennai",
    type: "Full-time",
    duration: "1 year",
    salary: "18,000/month",
    points: 320,
    premium: true
  },
  {
    id: 49,
    title: "Mason",
    company: "BuildMaster",
    location: "Bangalore",
    type: "Contract",
    duration: "6 months",
    salary: "21,000/month",
    points: 370,
    premium: false
  },
  {
    id: 50,
    title: "Drainage Cleaner",
    company: "Sanitech",
    location: "Kolkata",
    type: "Full-time",
    duration: "Ongoing",
    salary: "18,500/month",
    points: 340,
    premium: false
  },
  {
    id: 51,
    title: "Daily Wage Labourer",
    company: "LabourLink",
    location: "Hyderabad",
    type: "Daily Wage",
    duration: "Ongoing",
    salary: "600/day",
    points: 300,
    premium: false
  },
  {
    id: 52,
    title: "House Painter",
    company: "ColorWave",
    location: "Jaipur",
    type: "Contract",
    duration: "2 months",
    salary: "18,000/month",
    points: 310,
    premium: true
  },
  {
    id: 53,
    title: "Poultry Farm Worker",
    company: "FarmFresh",
    location: "Punjab",
    type: "Full-time",
    duration: "Ongoing",
    salary: "16,500/month",
    points: 280,
    premium: false
  },
  {
    id: 54,
    title: "Rickshaw Loader",
    company: "LoadMate",
    location: "Lucknow",
    type: "Daily Wage",
    duration: "Ongoing",
    salary: "700/day",
    points: 320,
    premium: false
  },
  {
    id: 55,
    title: "Hawker",
    company: "StreetBiz",
    location: "Ahmedabad",
    type: "Self-employed",
    duration: "Ongoing",
    salary: "Varies",
    points: 270,
    premium: false
  }
  
]