"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, LayoutDashboard, Menu, X } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

const navLinks = [
  { href: "/generator",    label: "Invoice Generator" },
  { href: "/how-it-works", label: "How it Works"      },
  { href: "/pricing",      label: "Pricing"           },
  { href: "/blog",         label: "Blog"              },
  { href: "/about",        label: "About"             },
]

export default function Navbar() {
  const router   = useRouter()
  const pathname = usePathname()
  const [user,       setUser]       = useState<User | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 shrink-0">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <FileText className="h-4 w-4 text-white" />
          </div>
          EuroInvoice
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-1.5 text-gray-600">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>Sign Out</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-gray-600">Sign In</Button>
              </Link>
              <Link href="/generator">
                <Button size="sm" className="gap-1.5 bg-blue-600 hover:bg-blue-700">
                  Create Invoice →
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-4 py-4 space-y-1 shadow-lg">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}>
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t space-y-2">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full gap-2 justify-start">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full" onClick={handleLogout}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link href="/login"><Button variant="outline" className="w-full">Sign In</Button></Link>
                <Link href="/generator"><Button className="w-full bg-blue-600 hover:bg-blue-700">Create Invoice →</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
