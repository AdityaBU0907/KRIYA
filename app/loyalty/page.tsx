import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Wallet, Gift, ShoppingBag, Umbrella, Utensils, Bus, Phone, CreditCard, Briefcase } from "lucide-react"

export default function LoyaltyPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Loyalty Program</h1>
        <p className="text-muted-foreground">Earn points for completing jobs and redeem for rewards</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Your Loyalty Wallet
            </CardTitle>
            <CardDescription>Current points and tier status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold">3,250</div>
                <div className="text-sm text-muted-foreground">Available Points</div>
              </div>
              <Badge variant="success" className="text-md px-3 py-1">
                Silver Tier
              </Badge>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span>Progress to Gold Tier</span>
                <span>3,250 / 4,000</span>
              </div>
              <Progress value={81} />
              <p className="text-xs text-muted-foreground">Earn 750 more points to reach Gold Tier</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Recent Activity</h3>
              {loyaltyActivity.map((activity) => (
                <div key={activity.id} className="flex justify-between items-center text-sm border-b pb-2">
                  <div>
                    <div className="font-medium">{activity.description}</div>
                    <div className="text-xs text-muted-foreground">{activity.date}</div>
                  </div>
                  <div className={`font-medium ${activity.type === "earned" ? "text-green-600" : "text-red-600"}`}>
                    {activity.type === "earned" ? "+" : "-"}
                    {activity.points}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="mr-2 h-5 w-5" />
              Tier Benefits
            </CardTitle>
            <CardDescription>Benefits for your current tier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Badge variant="success" className="mr-2">
                    Current
                  </Badge>
                  Silver Tier (2,000 - 3,999 points)
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4 text-green-500" />
                    10% discount on grocery purchases
                  </li>
                  <li className="flex items-center">
                    <Umbrella className="mr-2 h-4 w-4 text-green-500" />
                    Basic health insurance benefits
                  </li>
                  <li className="flex items-center">
                    <Utensils className="mr-2 h-4 w-4 text-green-500" />
                    Food vouchers worth ₹500 monthly
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Gold Tier (4,000 - 7,999 points)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    15% discount on grocery purchases
                  </li>
                  <li className="flex items-center">
                    <Umbrella className="mr-2 h-4 w-4" />
                    Enhanced health insurance benefits
                  </li>
                  <li className="flex items-center">
                    <Bus className="mr-2 h-4 w-4" />
                    Transportation allowance
                  </li>
                  <li className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Mobile recharge vouchers
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Platinum Tier (8,000+ points)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    25% discount on grocery purchases
                  </li>
                  <li className="flex items-center">
                    <Umbrella className="mr-2 h-4 w-4" />
                    Premium health insurance for family
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Cashback on all UPI transactions
                  </li>
                  <li className="flex items-center">
                    <Gift className="mr-2 h-4 w-4" />
                    Exclusive access to premium jobs
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-4">Redeem Your Points</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {redeemOptions.map((option) => (
          <Card key={option.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <option.icon className="mr-2 h-5 w-5" />
                {option.title}
              </CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Badge variant="outline">{option.points} points</Badge>
                <Badge variant={option.available ? "success" : "secondary"}>
                  {option.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <Button className="w-full" disabled={!option.available}>
                Redeem Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const loyaltyActivity = [
  {
    id: 1,
    description: "Completed Construction Job at Delhi Metro Corp",
    date: "2 days ago",
    points: 500,
    type: "earned",
  },
  {
    id: 2,
    description: "Redeemed Grocery Discount Voucher",
    date: "1 week ago",
    points: 200,
    type: "redeemed",
  },
  {
    id: 3,
    description: "Completed Delivery Job at QuickMart",
    date: "2 weeks ago",
    points: 300,
    type: "earned",
  },
  {
    id: 4,
    description: "Tenure Bonus - 3 Months at BuildRight",
    date: "1 month ago",
    points: 500,
    type: "earned",
  },
  {
    id: 5,
    description: "Redeemed Health Insurance Benefit",
    date: "1 month ago",
    points: 350,
    type: "redeemed",
  },
]

const redeemOptions = [
  {
    id: 1,
    title: "Grocery Discount",
    description: "10% off at partner grocery stores",
    points: 200,
    available: true,
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "Health Insurance",
    description: "Basic health coverage for 1 month",
    points: 350,
    available: true,
    icon: Umbrella,
  },
  {
    id: 3,
    title: "Food Vouchers",
    description: "₹500 worth of food vouchers",
    points: 250,
    available: true,
    icon: Utensils,
  },
  {
    id: 4,
    title: "UPI Cashback",
    description: "5% cashback on UPI transactions",
    points: 300,
    available: true,
    icon: CreditCard,
  },
  {
    id: 5,
    title: "Mobile Recharge",
    description: "₹200 mobile recharge voucher",
    points: 150,
    available: true,
    icon: Phone,
  },
  {
    id: 6,
    title: "Premium Job Access",
    description: "Unlock premium job listings for 1 month",
    points: 500,
    available: false,
    icon: Briefcase,
  },
]

