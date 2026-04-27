"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { Loader2, Plus, Trash2, Eye, EyeOff, LogOut } from "lucide-react"

// ── Admin email — only this email can access /admin ──────────────────────────
// Set NEXT_PUBLIC_ADMIN_EMAIL in Netlify environment variables
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  published: boolean
  created_at: string
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80)
}

export default function AdminPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [view, setView] = useState<"list" | "new" | "edit">("list")
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState("")
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(false)

  // Check if logged-in user is admin
  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push("/login"); return }
      if (session.user.email !== ADMIN_EMAIL) {
        router.push("/")
        return
      }
      setAuthorized(true)
      setChecking(false)
      loadPosts()
    }
    check()
  }, [router])

  async function loadPosts() {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false })
    setPosts(data ?? [])
  }

  function openNew() {
    setTitle(""); setSlug(""); setExcerpt(""); setContent(""); setPublished(false)
    setEditingPost(null)
    setView("new")
    setMsg("")
  }

  function openEdit(post: BlogPost) {
    setTitle(post.title); setSlug(post.slug); setExcerpt(post.excerpt ?? "")
    setContent(post.content); setPublished(post.published)
    setEditingPost(post)
    setView("edit")
    setMsg("")
  }

  async function handleSave() {
    if (!title.trim() || !content.trim()) {
      setMsg("Title and content are required.")
      return
    }
    setSaving(true)
    setMsg("")

    const payload = { title, slug: slug || generateSlug(title), excerpt, content, published }

    if (editingPost) {
      const { error } = await supabase
        .from("blog_posts")
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq("id", editingPost.id)
      setMsg(error ? `Error: ${error.message}` : "✅ Post updated!")
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload)
      setMsg(error ? `Error: ${error.message}` : "✅ Post created!")
      if (!error) { setView("list"); loadPosts() }
    }

    setSaving(false)
    loadPosts()
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return
    await supabase.from("blog_posts").delete().eq("id", id)
    loadPosts()
  }

  async function togglePublish(post: BlogPost) {
    await supabase
      .from("blog_posts")
      .update({ published: !post.published })
      .eq("id", post.id)
    loadPosts()
  }

  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!authorized) return null

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Admin</h1>
          <p className="text-gray-500 text-sm">Create and manage blog posts</p>
        </div>
        <div className="flex gap-3">
          {view !== "list" && (
            <Button variant="outline" onClick={() => setView("list")}>← All Posts</Button>
          )}
          {view === "list" && (
            <Button onClick={openNew} className="gap-2">
              <Plus className="h-4 w-4" /> New Post
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={async () => {
            await supabase.auth.signOut()
            router.push("/")
          }} className="gap-2">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>

      {/* ── LIST VIEW ── */}
      {view === "list" && (
        <div className="space-y-3">
          {posts.length === 0 && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed rounded-xl">
              <p className="font-medium">No posts yet</p>
              <p className="text-sm mt-1">Click &quot;New Post&quot; to write your first blog post</p>
            </div>
          )}
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="flex items-center justify-between py-4 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-semibold text-gray-900 truncate">{post.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">/blog/{post.slug}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublish(post)}
                    title={post.published ? "Unpublish" : "Publish"}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <Button variant="outline" size="sm" onClick={() => openEdit(post)}>Edit</Button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ── NEW / EDIT FORM ── */}
      {(view === "new" || view === "edit") && (
        <Card>
          <CardHeader>
            <CardTitle>{view === "new" ? "New Blog Post" : "Edit Post"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (!editingPost) setSlug(generateSlug(e.target.value))
                }}
                placeholder="How to Invoice as a Freelancer in Spain"
              />
            </div>

            <div className="space-y-2">
              <Label>Slug (URL)</Label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated from title"
              />
              <p className="text-xs text-gray-400">URL will be: /blog/{slug || "your-slug"}</p>
            </div>

            <div className="space-y-2">
              <Label>Excerpt (short summary shown on blog list)</Label>
              <Input
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief 1-2 sentence summary of this post..."
              />
            </div>

            <div className="space-y-2">
              <Label>Content * <span className="text-gray-400 font-normal">(separate paragraphs with blank line)</span></Label>
              <textarea
                className="flex min-h-[320px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Write your blog post here...\n\nStart a new paragraph by leaving a blank line.\n\nTip: Write about EU invoicing, VAT rules, country-specific tax tips to rank on Google.`}
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="published" className="cursor-pointer">
                Publish immediately (visible to everyone)
              </Label>
            </div>

            {msg && (
              <div className={`text-sm rounded-md p-3 ${
                msg.startsWith("✅")
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}>
                {msg}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : "Save Post"}
              </Button>
              <Button variant="outline" onClick={() => setView("list")}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
