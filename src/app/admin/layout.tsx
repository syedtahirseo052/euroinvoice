"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Loader2, LayoutDashboard, FileText, Users, LogOut, Menu, X } from "lucide-react"

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/login"); return }
      if (session.user.email !== ADMIN_EMAIL) { router.push("/"); return }
      setAuthorized(true)
      setChecking(false)
    })
  }, [router])

  if (checking) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )
  if (!authorized) return null

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Blog Posts", icon: FileText },
    { href: "/admin/users", label: "Users", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-60 bg-gray-900 flex flex-col
          transition-transform duration-200
          md:relative md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="h-16 flex items-center px-5 border-b border-gray-700 shrink-0">
          <span className="font-bold text-white text-base">⚡ EuroInvoice Admin</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="p-3 border-t border-gray-700 shrink-0">
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push("/") }}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b flex items-center px-4 gap-3 shrink-0">
          <button
            className="md:hidden p-1 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="text-sm text-gray-500 font-medium">Admin Panel</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
