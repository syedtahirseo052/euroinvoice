"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Globe, Users, PenSquare } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, users: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ count: total }, { count: published }, usersRes] = await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
        fetch("/api/admin/users"),
      ])
      const usersData = await usersRes.json()
      setStats({
        total: total ?? 0,
        published: published ?? 0,
        drafts: (total ?? 0) - (published ?? 0),
        users: usersData.users?.length ?? 0,
      })
      setLoading(false)
    }
    load()
  }, [])

  const statCards = [
    { label: "Total Posts", value: stats.total, icon: FileText, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/posts" },
    { label: "Published", value: stats.published, icon: Globe, color: "text-green-600", bg: "bg-green-50", href: "/admin/posts" },
    { label: "Drafts", value: stats.drafts, icon: PenSquare, color: "text-yellow-600", bg: "bg-yellow-50", href: "/admin/posts" },
    { label: "Users", value: stats.users, icon: Users, color: "text-purple-600", bg: "bg-purple-50", href: "/admin/users" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-7">Welcome to EuroInvoice Admin</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className={`inline-flex p-2 rounded-lg ${bg} mb-3`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "—" : value}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">{label}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick action cards */}
      <h2 className="text-base font-semibold text-gray-700 mb-3">Quick Access</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/admin/posts">
          <Card className="hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Blog Posts</h3>
                <p className="text-sm text-gray-500">Create, edit and publish blog posts</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/users">
          <Card className="hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Users</h3>
                <p className="text-sm text-gray-500">Add users, reset passwords, manage accounts</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
