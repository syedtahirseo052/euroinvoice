"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import {
  FileText, Users, TrendingUp, Globe,
  ArrowRight, Eye, EyeOff, Crown, UserCheck,
  DollarSign, PenSquare
} from "lucide-react"

interface BlogPost {
  id: string; title: string; slug: string; published: boolean; created_at: string
}
interface UserRow {
  id: string; email: string; created_at: string; plan: string
}

const PRO_PRICE = 19

export default function AdminDashboard() {
  const [posts, setPosts]   = useState<BlogPost[]>([])
  const [users, setUsers]   = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: postsData }, usersRes] = await Promise.all([
        supabase.from("blog_posts").select("id,title,slug,published,created_at").order("created_at", { ascending: false }).limit(6),
        fetch("/api/admin/users"),
      ])
      const usersData = await usersRes.json()
      setPosts(postsData ?? [])
      setUsers(usersData.users ?? [])
      setLoading(false)
    }
    load()
  }, [])

  async function togglePublish(post: BlogPost) {
    await supabase.from("blog_posts").update({ published: !post.published }).eq("id", post.id)
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, published: !p.published } : p))
  }

  const totalPosts   = posts.length
  const published    = posts.filter(p => p.published).length
  const proUsers     = users.filter(u => u.plan === "pro")
  const freeUsers    = users.filter(u => u.plan !== "pro")
  const revenue      = proUsers.length * PRO_PRICE
  const recentUsers  = [...users].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 8)

  function timeAgo(d: string) {
    const diff = Date.now() - new Date(d).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days < 30) return `${days} days ago`
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
  }

  const statCards = [
    { label: "Monthly Revenue",  value: `€${revenue}`,       sub: `${proUsers.length} Pro subscribers`, icon: DollarSign, bg: "bg-emerald-500", light: "bg-emerald-50 text-emerald-600", href: "/admin/users" },
    { label: "Total Users",      value: users.length,         sub: `${freeUsers.length} free · ${proUsers.length} pro`, icon: Users, bg: "bg-blue-500", light: "bg-blue-50 text-blue-600", href: "/admin/users" },
    { label: "Pro Subscribers",  value: proUsers.length,      sub: `€${revenue}/mo recurring`, icon: Crown, bg: "bg-violet-500", light: "bg-violet-50 text-violet-600", href: "/admin/users" },
    { label: "Blog Posts",       value: `${published}/${totalPosts}`, sub: `${published} published`, icon: FileText, bg: "bg-orange-500", light: "bg-orange-50 text-orange-600", href: "/admin/posts" },
  ]

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back — here&apos;s your business overview.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, sub, icon: Icon, bg, light, href }) => (
          <Link key={label} href={href}
            className="bg-white rounded-2xl p-5 border hover:shadow-lg hover:-translate-y-0.5 transition-all group">
            <div className={`inline-flex p-2.5 rounded-xl ${bg} mb-4`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">
              {loading ? <span className="text-gray-200">—</span> : value}
            </div>
            <div className="text-xs text-gray-500">{label}</div>
            <div className={`text-[10px] font-semibold mt-1.5 px-2 py-0.5 rounded-full inline-block ${light}`}>{sub}</div>
          </Link>
        ))}
      </div>

      {/* Revenue bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-1">💰 Estimated Monthly Recurring Revenue</p>
            <p className="text-4xl font-bold">€{loading ? "—" : revenue}</p>
            <p className="text-emerald-200 text-sm mt-1">{proUsers.length} Pro users × €{PRO_PRICE}/month</p>
          </div>
          <div className="text-right">
            <p className="text-emerald-100 text-sm mb-1">Annual run rate</p>
            <p className="text-2xl font-bold">€{loading ? "—" : revenue * 12}</p>
            <Link href="/admin/users" className="text-emerald-200 text-xs hover:text-white flex items-center gap-1 justify-end mt-2">
              View all customers <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* All Customers */}
        <div className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-gray-900">Customers</h2>
              <p className="text-xs text-gray-400">{users.length} total · {proUsers.length} Pro</p>
            </div>
            <Link href="/admin/users" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-3 items-center">
                  <div className="h-9 w-9 bg-gray-100 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                    <div className="h-2 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentUsers.length === 0 ? (
            <div className="text-center py-10">
              <UserCheck className="h-8 w-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No customers yet</p>
            </div>
          ) : (
            <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
              {recentUsers.map((u) => {
                const initials = u.email.slice(0, 2).toUpperCase()
                const isPro = u.plan === "pro"
                return (
                  <div key={u.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 group">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                      isPro ? "bg-gradient-to-br from-violet-500 to-blue-600" : "bg-gradient-to-br from-gray-400 to-gray-500"
                    }`}>
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{u.email}</p>
                      <p className="text-xs text-gray-400">{timeAgo(u.created_at)}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      {isPro ? (
                        <span className="inline-flex items-center gap-1 bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <Crown className="h-2.5 w-2.5" /> PRO · €{PRO_PRICE}
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-400 text-[10px] font-medium px-2 py-0.5 rounded-full">FREE</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <Link href="/admin/users"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-colors">
            <Users className="h-4 w-4" /> Manage All Users
          </Link>
        </div>

        {/* Blog Posts */}
        <div className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-gray-900">Blog Posts</h2>
              <p className="text-xs text-gray-400">{published} published · {totalPosts - published} draft</p>
            </div>
            <Link href="/admin/posts" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-3 items-center">
                  <div className="h-8 w-8 bg-gray-100 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-2 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="h-8 w-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No posts yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 group">
                  <div className={`p-2 rounded-lg shrink-0 ${post.published ? "bg-emerald-50" : "bg-gray-100"}`}>
                    <FileText className={`h-3.5 w-3.5 ${post.published ? "text-emerald-600" : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{post.title}</p>
                    <p className="text-xs text-gray-400">{timeAgo(post.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      post.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"
                    }`}>
                      {post.published ? "LIVE" : "DRAFT"}
                    </span>
                    <button onClick={() => togglePublish(post)}
                      className="text-gray-300 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100">
                      {post.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link href="/admin/posts"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-colors">
            <PenSquare className="h-4 w-4" /> Write New Post
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-slate-900 rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/posts",  icon: PenSquare,  label: "Write a Post",  color: "bg-blue-600 hover:bg-blue-700" },
            { href: "/admin/users",  icon: Users,      label: "Manage Users", color: "bg-violet-600 hover:bg-violet-700" },
            { href: "/blog",         icon: Globe,      label: "View Blog",    color: "bg-white/10 hover:bg-white/20" },
            { href: "/",             icon: TrendingUp, label: "View Site",    color: "bg-white/10 hover:bg-white/20" },
          ].map(({ href, icon: Icon, label, color }) => (
            <Link key={href} href={href} target={href.startsWith("/blog") || href === "/" ? "_blank" : undefined}>
              <button className={`${color} text-white transition-colors px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2`}>
                <Icon className="h-4 w-4" /> {label}
              </button>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
