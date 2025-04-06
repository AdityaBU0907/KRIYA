"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, Home, Search, User, Wallet, Star, Settings, Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile, openMobile, setOpenMobile } = useSidebar()

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      name: "Job Search",
      path: "/job-search",
      icon: Search,
    },
    {
      name: "My Jobs",
      path: "/my-jobs",
      icon: Briefcase,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Loyalty Points",
      path: "/loyalty",
      icon: Wallet,
    },
    {
      name: "Ratings",
      path: "/ratings",
      icon: Star,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {openMobile && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setOpenMobile(false)}
          />
        )}

        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r transform transition-transform duration-200 ease-in-out md:hidden",
            openMobile ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b">
          <Image src="/logo.png" alt="Logo" width={50} height={50} className="mr-2" />
          <h1 className="text-2xl font-semibold">Kriya</h1>
            <Button variant="ghost" size="icon" onClick={() => setOpenMobile(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  pathname === route.path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
                onClick={() => setOpenMobile(false)}
              >
                <route.icon className="h-5 w-5" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      </>
    )
  }
//logo
  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-sidebar">
      <div className="flex items-center h-16 px-4 border-b">
      <Image src="/logo.png" alt="Logo" width={50} height={50} className="mr-2" />
      <h1 className="text-2xl font-semibold">Kriya</h1>
      </div>
      <nav className="flex flex-col gap-1 p-4 flex-1">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === route.path
                ? "bg-primary text-primary-foreground"
                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

