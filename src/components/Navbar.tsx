"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, LayoutDashboard } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <FileText className="h-6 w-6" />
          EuroInvoice
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/generator" className="text-gray-600 hover:text-blue-600 transition-colors">
            Invoice Generator
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
            How it Works
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
            Blog
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            // Logged in — show dashboard + logout
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            // Logged out — show sign in + create invoice
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/generator">
                <Button size="sm">Create Invoice</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
