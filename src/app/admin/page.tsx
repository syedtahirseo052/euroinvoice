"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { FileText, Globe, Users, PenSquare, ArrowRight, Eye, EyeOff, UserPlus } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  published: boolean
  created_at: string
}

interface UserRow {
  id: string
  email: string
  created_at: string
  plan: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, users: 0 })
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [recentUsers, setRecentUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [
        { count: total },
        { count: published },
        { data: posts },
        usersRes,
      ] = await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
        supabase.from("blog_posts").select("id,title,slug,published,created_at").order("created_at", { ascending: false }).limit(5),
        fetch("/api/admin/users"),
      ])

      const usersData = await usersRes.json()
      const allUsers: UserRow[] = usersData.users ?? []

      setStats({
        total: total ?? 0,
        published: published ?? 0,
        drafts: (total ?? 0) - (published ?? 0),
        users: allUsers.length,
      })
      setRecentPosts(posts ?? [])
      setRecentUsers(allUsers.slice(0, 5))
      setLoading(false)
    }
    load()
  }, [])

  async function togglePublish(post: BlogPost) {
    await supabase.from("blog_posts").update({ published: !post.published }).eq("id", post.id)
    setRecentPosts(prev => prev.map(p => p.id === post.id ? { ...p, published: !p.published } : p))
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    return `${days} days ago`
  }

  const statCards = [
    { label: "Total Posts", value: stats.total, icon: FileText, color: "text-blue-600", bg: "bg-blue-500", href: "/admin/posts" },
    { label: "Published", value: stats.published, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-500", href: "/admin/posts" },
    { label: "Drafts", value: stats.drafts, icon: PenSquare, color: "text-amber-600", bg: "bg-amber-500", href: "/admin/posts" },
    { label: "Total Users", value: stats.users, icon: Users, color: "text-violet-600", bg: "bg-violet-500", href: "/admin/users" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back — here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, bg, href }) => (
          <Link key={label} href={href}
            className="bg-white rounded-2xl p-5 border hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div className={`inline-flex p-2.5 rounded-xl ${bg} mb-4`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-0.5">
              {loading ? <span className="text-gray-300">—</span> : value}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
              {label} <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>

      {/* Two-column content */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Posts */}
        <div className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Recent Posts</h2>
            <Link href="/admin/posts" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-3 items-center">
                  <div className="h-8 w-8 bg-gray-100 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-8 w-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No posts yet</p>
              <Link href="/admin/posts" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                Write your first post →
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 group">
                  <div className={`p-2 rounded-lg shrink-0 ${post.published ? "bg-emerald-50" : "bg-gray-100"}`}>
                    <FileText className={`h-3.5 w-3.5 ${post.published ? "text-emerald-600" : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{post.title}</p>
                    <p className="text-xs text-gray-400">{timeAgo(post.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {post.published ? "Live" : "Draft"}
                    </span>
                    <button
                      onClick={() => togglePublish(post)}
                      className="text-gray-300 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                      title={post.published ? "Unpublish" : "Publish"}
                    >
                      {post.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link href="/admin/posts"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            <PenSquare className="h-4 w-4" /> New Post
          </Link>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Recent Users</h2>
            <Link href="/admin/users" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-3 items-center">
                  <div className="h-8 w-8 bg-gray-100 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                    <div className="h-2.5 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-8 w-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No users yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {recentUsers.map((u) => {
                const initials = u.email.slice(0, 2).toUpperCase()
                return (
                  <div key={u.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{u.email}</p>
                      <p className="text-xs text-gray-400">{timeAgo(u.created_at)}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      u.plan === "pro"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {u.plan === "pro" ? "Pro" : "Free"}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          <Link href="/admin/users"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-violet-300 hover:text-violet-600 transition-colors"
          >
            <UserPlus className="h-4 w-4" /> Add User
          </Link>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-6 text-white">
        <h2 className="font-semibold text-lg mb-1">Quick Actions</h2>
        <p className="text-blue-100 text-sm mb-4">Jump to common tasks</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/posts" className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
            <PenSquare className="h-4 w-4" /> Write a Post
          </Link>
          <Link href="/admin/users" className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Add a User
          </Link>
          <Link href="/blog" target="_blank" className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
            <Globe className="h-4 w-4" /> View Blog
          </Link>
          <Link href="/" target="_blank" className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
            <ArrowRight className="h-4 w-4" /> View Site
          </Link>
        </div>
      </div>
    </div>
  )
}
