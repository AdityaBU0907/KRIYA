import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp, Award, TrendingUp, Clock, Calendar } from "lucide-react"

export default function RatingsPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Ratings & Trust Score</h1>
        <p className="text-muted-foreground">View your ratings, trust score, and performance metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-center">Trust Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative inline-flex my-4">
              <div className="w-32 h-32 rounded-full flex items-center justify-center bg-primary/10">
                <div className="text-4xl font-bold">4.8</div>
              </div>
              <div className="absolute -top-2 -right-2">
                <Badge className="px-2 py-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.2
                </Badge>
              </div>
            </div>
            <div className="flex justify-center mb-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                ))}
            </div>
            <p className="text-sm text-muted-foreground">Based on 24 job completions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Rating Breakdown</CardTitle>
            <CardDescription>Performance by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm">Reliability</div>
                  <div className="text-sm font-medium">4.9/5.0</div>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm">Punctuality</div>
                  <div className="text-sm font-medium">4.7/5.0</div>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm">Work Quality</div>
                  <div className="text-sm font-medium">4.8/5.0</div>
                </div>
                <Progress value={96} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm">Communication</div>
                  <div className="text-sm font-medium">4.6/5.0</div>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Trust Score Benefits</CardTitle>
            <CardDescription>Unlock benefits with your score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-2 rounded-md bg-primary/10">
                <Award className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <div className="font-medium">Premium Job Access</div>
                  <div className="text-xs text-muted-foreground">Unlocked at 4.5+ rating</div>
                </div>
                <ThumbsUp className="h-4 w-4 ml-auto text-green-500" />
              </div>

              <div className="flex items-center p-2 rounded-md bg-primary/10">
                <Award className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <div className="font-medium">Priority Matching</div>
                  <div className="text-xs text-muted-foreground">Unlocked at 4.5+ rating</div>
                </div>
                <ThumbsUp className="h-4 w-4 ml-auto text-green-500" />
              </div>

              <div className="flex items-center p-2 rounded-md border">
                <Award className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="font-medium">Higher Pay Rate</div>
                  <div className="text-xs text-muted-foreground">Unlocked at 4.9+ rating</div>
                </div>
              </div>

              <div className="flex items-center p-2 rounded-md border">
                <Award className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="font-medium">Advance Payment Option</div>
                  <div className="text-xs text-muted-foreground">Unlocked at 4.9+ rating</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rating History</CardTitle>
          <CardDescription>Your rating trend over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full max-w-3xl">
              {/* This would be a chart in a real implementation */}
              <div className="h-48 bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Rating trend chart would appear here</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-4">Recent Employer Feedback</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {employerFeedback.map((feedback) => (
          <Card key={feedback.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-lg">{feedback.employer}</CardTitle>
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                </div>
              </div>
              <CardDescription>{feedback.job}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{feedback.comment}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {feedback.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {feedback.duration}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Improve Your Trust Score</CardTitle>
          <CardDescription>Tips to enhance your ratings and trust score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Be Punctual</h3>
                <p className="text-sm text-muted-foreground">
                  Always arrive on time or a few minutes early for your jobs. Punctuality is one of the most valued
                  traits by employers.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                <ThumbsUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Deliver Quality Work</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on delivering high-quality work consistently. Take pride in your work and pay attention to
                  details.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Maintain Consistency</h3>
                <p className="text-sm text-muted-foreground">
                  Consistently complete jobs and maintain a regular work schedule. Reliability builds trust over time.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Seek Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Actively ask for feedback from employers and use it to improve your performance on future jobs.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const employerFeedback = [
  {
    id: 1,
    employer: "Delhi Metro Corp",
    job: "Construction Worker",
    rating: 5,
    comment:
      "Rahul is an excellent worker. He is punctual, reliable, and completes all tasks efficiently. His attention to safety protocols was particularly impressive. Would definitely hire again for future projects.",
    date: "May 15, 2023",
    duration: "3 months",
  },
  {
    id: 2,
    employer: "QuickMart",
    job: "Delivery Associate",
    rating: 4,
    comment:
      "Good work ethic and customer service skills. Sometimes had issues with navigation but overall a good performer. Customers provided positive feedback about his politeness and professionalism.",
    date: "April 2, 2023",
    duration: "2 months",
  },
  {
    id: 3,
    employer: "BuildRight Construction",
    job: "Construction Worker",
    rating: 5,
    comment:
      "One of our best workers. Takes initiative and has excellent attention to detail. Rahul consistently went above and beyond what was required and showed great teamwork skills.",
    date: "March 10, 2023",
    duration: "6 months",
  },
  {
    id: 4,
    employer: "StoragePlus",
    job: "Warehouse Helper",
    rating: 5,
    comment:
      "Excellent attention to detail and organization skills. Very reliable and hardworking. Rahul quickly learned our inventory system and became one of our most efficient workers.",
    date: "January 5, 2023",
    duration: "4 months",
  },
]

