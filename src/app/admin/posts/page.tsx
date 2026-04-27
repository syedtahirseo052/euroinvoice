"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { Loader2, Plus, Trash2, Eye, EyeOff, Search, User } from "lucide-react"
import dynamic from "next/dynamic"

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => <div className="h-[420px] border rounded-xl bg-gray-50 animate-pulse" />,
})

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  published: boolean
  created_at: string
  meta_title: string
  meta_description: string
  author_name: string
  author_bio: string
  author_avatar: string
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80)
}

export default function PostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "new" | "edit">("list")
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState("")
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  // Basic fields
  const [title, setTitle]       = useState("")
  const [slug, setSlug]         = useState("")
  const [excerpt, setExcerpt]   = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [content, setContent]   = useState("")
  const [published, setPublished] = useState(false)

  // SEO fields
  const [metaTitle, setMetaTitle]             = useState("")
  const [metaDescription, setMetaDescription] = useState("")

  // Author fields
  const [authorName, setAuthorName]     = useState("")
  const [authorBio, setAuthorBio]       = useState("")
  const [authorAvatar, setAuthorAvatar] = useState("")

  async function loadPosts() {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false })
    setPosts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { loadPosts() }, [])

  function openNew() {
    setTitle(""); setSlug(""); setExcerpt(""); setImageUrl(""); setContent(""); setPublished(false)
    setMetaTitle(""); setMetaDescription("")
    setAuthorName(""); setAuthorBio(""); setAuthorAvatar("")
    setEditingPost(null); setMsg(""); setView("new")
  }

  function openEdit(post: BlogPost) {
    setTitle(post.title); setSlug(post.slug); setExcerpt(post.excerpt ?? "")
    setImageUrl(post.image_url ?? ""); setContent(post.content); setPublished(post.published)
    setMetaTitle(post.meta_title ?? ""); setMetaDescription(post.meta_description ?? "")
    setAuthorName(post.author_name ?? ""); setAuthorBio(post.author_bio ?? ""); setAuthorAvatar(post.author_avatar ?? "")
    setEditingPost(post); setMsg(""); setView("edit")
  }

  async function handleSave() {
    if (!title.trim() || !content.trim()) { setMsg("Title and content are required."); return }
    setSaving(true); setMsg("")

    const payload = {
      title,
      slug: slug || generateSlug(title),
      excerpt,
      image_url: imageUrl,
      content,
      published,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      author_name: authorName || null,
      author_bio: authorBio || null,
      author_avatar: authorAvatar || null,
    }

    if (editingPost) {
      // Try direct Supabase first, fallback to admin API
      const { error } = await supabase
        .from("blog_posts")
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq("id", editingPost.id)

      if (error) {
        // Fallback: use admin API route
        const res = await fetch("/api/admin/insert-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, updated_at: new Date().toISOString() }),
        })
        const json = await res.json()
        setMsg(json.success ? "✅ Post updated!" : `Error: ${json.error}`)
      } else {
        setMsg("✅ Post updated!")
      }
    } else {
      // Try direct Supabase first, fallback to admin API
      const { error } = await supabase.from("blog_posts").insert(payload)

      if (error) {
        // Fallback: use admin API route
        const res = await fetch("/api/admin/insert-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        const json = await res.json()
        if (json.success) {
          setMsg("✅ Post created!")
          setView("list")
          loadPosts()
        } else {
          setMsg(`Error: ${json.error}`)
        }
      } else {
        setMsg("✅ Post created!")
        setView("list")
        loadPosts()
      }
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
    await supabase.from("blog_posts").update({ published: !post.published }).eq("id", post.id)
    loadPosts()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500">{posts.length} posts total</p>
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
        </div>
      </div>

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="space-y-2">
          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          )}
          {!loading && posts.length === 0 && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed rounded-xl">
              <p className="font-medium">No posts yet</p>
              <p className="text-sm mt-1">Click &quot;New Post&quot; to write your first blog post</p>
            </div>
          )}
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="flex items-center justify-between py-4 px-5 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="font-semibold text-gray-900 truncate">{post.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
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

      {/* NEW / EDIT FORM */}
      {(view === "new" || view === "edit") && (
        <div className="space-y-6">

          {/* ─── BASIC INFO ─── */}
          <Card>
            <CardHeader>
              <CardTitle>{view === "new" ? "✍️ New Blog Post" : "✏️ Edit Post"}</CardTitle>
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
                <Label>Slug (URL) *</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 shrink-0">/blog/</span>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="auto-generated from title"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-400">Full URL: /blog/{slug || "your-slug"}</p>
              </div>

              <div className="space-y-2">
                <Label>Excerpt <span className="text-gray-400 font-normal">(short 1-2 sentence summary)</span></Label>
                <Input
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A brief summary of the post..."
                />
              </div>

              <div className="space-y-2">
                <Label>Feature Image URL <span className="text-gray-400 font-normal">(from Unsplash etc.)</span></Label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                />
                {imageUrl && (
                  <div className="relative w-full h-36 rounded-lg overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-xs text-gray-400">
                  Free images: <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">unsplash.com</a> → open image → right click → Copy Image Address
                </p>
              </div>

              <div className="space-y-2">
                <Label>Content *</Label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Start writing your blog post here... Use H1, H2, H3 buttons for headings, Bold for keywords, and the link button to add URLs."
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
            </CardContent>
          </Card>

          {/* ─── SEO SETTINGS ─── */}
          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Search className="h-4 w-4 text-emerald-600" />
                SEO Settings
                <span className="text-xs font-normal text-gray-400 ml-1">— How this post appears on Google</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* Google preview */}
              <div className="bg-white border rounded-xl p-4">
                <p className="text-[10px] text-gray-400 mb-2 font-medium uppercase tracking-wider">Google Preview</p>
                <p className="text-blue-700 text-base font-medium leading-tight truncate">
                  {metaTitle || title || "Your Post Title — EuroInvoice Blog"}
                </p>
                <p className="text-green-700 text-xs mt-0.5 truncate">
                  charming-choux-c5a879.netlify.app/blog/{slug || "your-slug"}
                </p>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {metaDescription || excerpt || "Your meta description will appear here on Google search results..."}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">
                  SEO Title <span className="text-gray-400 font-normal">(leave blank to use post title)</span>
                </Label>
                <Input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={title ? `${title} — EuroInvoice Blog` : "Custom title for Google..."}
                  maxLength={70}
                />
                <p className="text-xs text-gray-400">{metaTitle.length}/70 characters</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">
                  Meta Description <span className="text-gray-400 font-normal">(shown under title on Google)</span>
                </Label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder={excerpt || "Write 1-2 sentences describing this post for Google (max 160 characters)..."}
                  maxLength={160}
                />
                <p className="text-xs text-gray-400">{metaDescription.length}/160 characters</p>
              </div>

            </CardContent>
          </Card>

          {/* ─── AUTHOR PROFILE ─── */}
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-blue-600" />
                Author Profile
                <span className="text-xs font-normal text-gray-400 ml-1">— Shown at the bottom of the post</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* Author preview */}
              {(authorName || authorBio) && (
                <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
                  {authorAvatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={authorAvatar} alt="Avatar" className="h-12 w-12 rounded-full object-cover shrink-0 border" />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">Written by</p>
                    <p className="font-bold text-gray-900">{authorName || "Author Name"}</p>
                    {authorBio && <p className="text-xs text-gray-500 mt-0.5">{authorBio}</p>}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Author Name</Label>
                  <Input
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Tahir Saleem"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Avatar Photo URL <span className="text-gray-400 font-normal">(optional)</span></Label>
                  <Input
                    value={authorAvatar}
                    onChange={(e) => setAuthorAvatar(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Author Bio <span className="text-gray-400 font-normal">(1-2 sentences)</span></Label>
                <Input
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  placeholder="EU invoicing expert and freelance finance writer."
                />
              </div>

            </CardContent>
          </Card>

          {/* Save / Cancel */}
          {msg && (
            <div className={`text-sm rounded-md p-3 ${
              msg.startsWith("✅")
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}>
              {msg}
            </div>
          )}

          <div className="flex gap-3 pb-2">
            <Button onClick={handleSave} disabled={saving} className="gap-2 bg-blue-600 hover:bg-blue-700">
              {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : "💾 Save Post"}
            </Button>
            <Button variant="outline" onClick={() => setView("list")}>Cancel</Button>
          </div>

        </div>
      )}
    </div>
  )
}
