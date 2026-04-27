"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { FileText, Plus, LogOut, Crown, Loader2 } from "lucide-react"

interface Profile {
  email: string
  plan: string
  full_name: string | null
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState(false)

  useEffect(() => {
    async function loadUser() {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
        return
      }

      // Load profile from DB
      const { data } = await supabase
        .from("profiles")
        .select("email, plan, full_name")
        .eq("id", session.user.id)
        .single()

      setProfile(data ?? { email: session.user.email!, plan: "free", full_name: null })
      setLoading(false)
    }
    loadUser()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  async function handleUpgrade() {
    setUpgrading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user.id,
          email: session?.user.email,
          plan: "monthly",
        }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      alert("Could not start checkout. Please try again.")
    } finally {
      setUpgrading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">{profile?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Plan badge */}
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            profile?.plan === "pro"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600"
          }`}>
            {profile?.plan === "pro" ? "⭐ PRO" : "FREE"}
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>

      {/* Upgrade banner — only for free users */}
      {profile?.plan !== "pro" && (
        <Card className="border-blue-200 bg-blue-50 mb-8">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-blue-600 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Upgrade to Pro — €19/month</p>
                <p className="text-sm text-gray-600">Save invoices, send by email, auto-recurring, all 24 languages</p>
              </div>
            </div>
            <Button onClick={handleUpgrade} disabled={upgrading} className="shrink-0 gap-2">
              {upgrading ? <><Loader2 className="h-4 w-4 animate-spin" />Loading...</> : "Upgrade to Pro →"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link href="/generator">
          <Card className="hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="p-3 bg-blue-50 rounded-full">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900">New Invoice</p>
              <p className="text-xs text-gray-400 text-center">Create and download PDF</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="opacity-60">
          <CardContent className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="p-3 bg-gray-100 rounded-full">
              <FileText className="h-6 w-6 text-gray-400" />
            </div>
            <p className="font-semibold text-gray-700">Saved Invoices</p>
            <p className="text-xs text-gray-400 text-center">Pro feature</p>
          </CardContent>
        </Card>

        <Card className="opacity-60">
          <CardContent className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="p-3 bg-gray-100 rounded-full">
              <Crown className="h-6 w-6 text-gray-400" />
            </div>
            <p className="font-semibold text-gray-700">Recurring Invoices</p>
            <p className="text-xs text-gray-400 text-center">Pro feature</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent invoices placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-400">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No invoices yet</p>
            <p className="text-sm mt-1">Create your first invoice to see it here</p>
            <Link href="/generator">
              <Button className="mt-4 gap-2" size="sm">
                <Plus className="h-4 w-4" /> Create Invoice
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
