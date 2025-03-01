import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, MapPin, Clock, CheckCircle, Phone, Mail, User, Edit } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Worker Profile</h1>
        <p className="text-muted-foreground">Manage your profile, skills, and job preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <User className="h-12 w-12 text-primary" />
              </div>
              <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Profile Picture</span>
              </Button>
            </div>
            <CardTitle>Rahul Singh</CardTitle>
            <CardDescription className="flex items-center justify-center">
              <MapPin className="h-3 w-3 mr-1" /> Delhi NCR
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Trust Score</div>
                <div className="flex items-center">
                  <span className="font-medium mr-1">4.8</span>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Jobs Completed</div>
                <div className="font-medium">24</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Loyalty Points</div>
                <div className="font-medium">3,250</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Member Since</div>
                <div className="font-medium">June 2023</div>
              </div>

              <div className="pt-2">
                <div className="flex items-center mb-2">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>rahul.s@example.com</span>
                </div>
              </div>

              <Button className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Skills & Experience</CardTitle>
            <CardDescription>Your skills, experience, and job preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Primary Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Construction</Badge>
                  <Badge variant="secondary">Delivery</Badge>
                  <Badge variant="secondary">Warehouse Management</Badge>
                  <Badge variant="secondary">Driving</Badge>
                  <Badge variant="secondary">Security</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Work Experience</h3>
                <div className="space-y-3">
                  {workExperience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-primary/50 pl-4">
                      <div className="font-medium">{exp.role}</div>
                      <div className="text-sm">{exp.company}</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {exp.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Certifications</h3>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <div>
                        <div className="text-sm font-medium">{cert.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {cert.issuer} • {cert.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Job Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Preferred Locations</div>
                    <div className="text-sm">Delhi, Gurgaon, Noida</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Job Types</div>
                    <div className="text-sm">Full-time, Part-time</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Expected Salary</div>
                    <div className="text-sm">₹20,000 - ₹30,000 per month</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Availability</div>
                    <div className="text-sm">Immediate</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Skills & Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trust Score & Ratings</CardTitle>
          <CardDescription>Your performance metrics and employer feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Overall Trust Score</h3>
                <div className="flex items-center">
                  <span className="font-bold text-lg mr-2">4.8</span>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <Progress value={96} className="h-2 mb-4" />

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm">Reliability</div>
                    <div className="text-sm font-medium">4.9/5.0</div>
                  </div>
                  <Progress value={98} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm">Punctuality</div>
                    <div className="text-sm font-medium">4.7/5.0</div>
                  </div>
                  <Progress value={94} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm">Work Quality</div>
                    <div className="text-sm font-medium">4.8/5.0</div>
                  </div>
                  <Progress value={96} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm">Communication</div>
                    <div className="text-sm font-medium">4.6/5.0</div>
                  </div>
                  <Progress value={92} className="h-1.5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Recent Employer Feedback</h3>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {employerFeedback.map((feedback) => (
                  <div key={feedback.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{feedback.employer}</span>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                    </div>
                    <p className="text-sm">{feedback.comment}</p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-xs text-muted-foreground">{feedback.job}</div>
                      <div className="text-xs text-muted-foreground">{feedback.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const workExperience = [
  {
    id: 1,
    role: "Construction Worker",
    company: "BuildRight Construction",
    duration: "Jan 2023 - Present",
  },
  {
    id: 2,
    role: "Delivery Associate",
    company: "FastDelivery",
    duration: "Jun 2022 - Dec 2022",
  },
  {
    id: 3,
    role: "Warehouse Helper",
    company: "StoragePlus",
    duration: "Jan 2022 - May 2022",
  },
]

const certifications = [
  {
    id: 1,
    name: "Construction Safety Training",
    issuer: "Safety First Institute",
    date: "March 2023",
  },
  {
    id: 2,
    name: "Driving License - Commercial",
    issuer: "Delhi RTO",
    date: "January 2022",
  },
  {
    id: 3,
    name: "Basic First Aid",
    issuer: "Red Cross India",
    date: "November 2022",
  },
]

const employerFeedback = [
  {
    id: 1,
    employer: "Delhi Metro Corp",
    job: "Construction Worker",
    rating: 5,
    comment:
      "Rahul is an excellent worker. He is punctual, reliable, and completes all tasks efficiently. Would definitely hire again.",
    date: "2 days ago",
  },
  {
    id: 2,
    employer: "QuickMart",
    job: "Delivery Associate",
    rating: 4,
    comment:
      "Good work ethic and customer service skills. Sometimes had issues with navigation but overall a good performer.",
    date: "1 week ago",
  },
  {
    id: 3,
    employer: "BuildRight Construction",
    job: "Construction Worker",
    rating: 5,
    comment: "One of our best workers. Takes initiative and has excellent attention to detail.",
    date: "2 weeks ago",
  },
  {
    id: 4,
    employer: "StoragePlus",
    job: "Warehouse Helper",
    rating: 5,
    comment: "Excellent attention to detail and organization skills. Very reliable and hardworking.",
    date: "1 month ago",
  },
  {
    id: 5,
    employer: "FastDelivery",
    job: "Delivery Associate",
    rating: 4,
    comment: "Reliable and punctual. Good communication with customers.",
    date: "2 months ago",
  },
]

