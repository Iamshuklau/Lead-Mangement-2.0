"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Building2, 
  Users, 
  UserPlus, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  role: 'admin' | 'staff'
  userName?: string
  userEmail?: string
}

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin-dashboard",
    icon: Home
  },
  {
    title: "Visitor Log",
    href: "/admin-dashboard/visitor-log",
    icon: ClipboardList
  },
  {
    title: "Analytics",
    href: "/admin-dashboard/analytics",
    icon: BarChart3
  },
  {
    title: "Settings",
    href: "/admin-dashboard/settings",
    icon: Settings
  }
]

const staffNavItems = [
  {
    title: "Dashboard",
    href: "/staff-dashboard",
    icon: Home
  },
  {
    title: "Register Visitor",
    href: "/staff-dashboard/register",
    icon: UserPlus
  },
  {
    title: "Active Visitors",
    href: "/staff-dashboard/active",
    icon: Users
  },
  {
    title: "Visit History",
    href: "/staff-dashboard/history",
    icon: ClipboardList
  }
]

export function Sidebar({ role, userName = "User", userEmail = "user@ritm.edu" }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navItems = role === 'admin' ? adminNavItems : staffNavItems

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden glass"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 glass-dark backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out",
        "md:translate-x-0",
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">RITM VMS</h2>
                <p className="text-xs text-white/60 capitalize">{role} Panel</p>
              </div>
            </div>
          </div>

          {/* User profile */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{userName}</p>
                <p className="text-white/60 text-sm truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                const Icon = item.icon
                
                return (
                  <Link key={item.href} href={item.href}>
                    <div className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                      isActive 
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5 transition-transform duration-200",
                        isActive ? "text-blue-400" : "text-white/50 group-hover:text-white group-hover:scale-110"
                      )} />
                      {item.title}
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-red-500/20"
              onClick={() => {
                // Add logout logic here
                window.location.href = '/'
              }}
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  )
} 