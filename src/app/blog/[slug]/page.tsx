import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react"
import type { Metadata } from "next"

export const revalidate = 60

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80"

async function getPost(slug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()
  return data
}

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://charming-choux-c5a879.netlify.app"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}

  const metaTitle       = post.meta_title       || `${post.title} — EuroInvoice Blog`
  const metaDescription = post.meta_description || post.excerpt || post.content.slice(0, 160)
  const canonicalUrl    = `${SITE_URL}/blog/${post.slug}`
  const ogImage         = post.image_url || `${SITE_URL}/og-default.jpg`

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title:       metaTitle,
      description: metaDescription,
      url:         canonicalUrl,
      siteName:    "EuroInvoice",
      images:      [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      type:        "article",
      publishedTime: post.created_at,
      authors:     post.author_name ? [post.author_name] : ["EuroInvoice Team"],
    },
    twitter: {
      card:        "summary_large_image",
      title:       metaTitle,
      description: metaDescription,
      images:      [ogImage],
    },
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  })
}

function readTime(content: string) {
  return Math.max(3, Math.ceil(content.split(" ").length / 200))
}

function renderContent(content: string) {
  return content.split("\n\n").map((para, i) => {
    // Detect ALL-CAPS lines as subheadings
    const trimmed = para.trim()
    const isHeading = trimmed === trimmed.toUpperCase() && trimmed.length > 5 && trimmed.length < 80 && /^[A-Z]/.test(trimmed)
    if (isHeading) {
      return (
        <h2 key={i} className="text-xl font-bold text-gray-900 mt-10 mb-3 border-l-4 border-blue-500 pl-4">
          {trimmed}
        </h2>
      )
    }
    return (
      <p key={i} className="mb-5 leading-relaxed text-gray-600 text-base">
        {para}
      </p>
    )
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const heroImage = post.image_url || FALLBACK_IMAGE
  const mins = readTime(post.content)

  return (
    <article className="bg-white min-h-screen">

      {/* ── Hero image ── */}
      <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden">
        <Image
          src={heroImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Back link */}
        <div className="absolute top-6 left-6">
          <Link href="/blog"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-16">
          <div className="container max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-white/70 text-sm mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.created_at)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {mins} min read
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container max-w-3xl mx-auto px-4 md:px-6 py-12">

        {/* Excerpt / lead */}
        {post.excerpt && (
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl px-6 py-4 mb-10">
            <p className="text-blue-800 text-lg font-medium leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* Body */}
        <div className="prose-custom">
          {renderContent(post.content)}
        </div>

        {/* Tags / meta */}
        <div className="mt-12 pt-8 border-t flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">EU Invoicing</span>
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">Freelance</span>
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">VAT</span>
          </div>
          <Link href="/blog" className="text-sm text-gray-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
            More articles <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* ── Author card ── */}
        <div className="mt-10 bg-gray-50 border border-gray-200 rounded-2xl p-6 flex items-start gap-5">
          {/* Avatar */}
          {post.author_avatar ? (
            <img
              src={post.author_avatar}
              alt={post.author_name || "Author"}
              className="h-16 w-16 rounded-full object-cover shrink-0 border-2 border-white shadow"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0 shadow">
              <User className="h-7 w-7 text-white" />
            </div>
          )}
          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">Written by</p>
            <h3 className="text-lg font-bold text-gray-900">
              {post.author_name || "EuroInvoice Team"}
            </h3>
            {post.author_bio && (
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{post.author_bio}</p>
            )}
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <Calendar className="h-3.5 w-3.5" />
              Published {formatDate(post.created_at)}
              <span>·</span>
              <Clock className="h-3.5 w-3.5" />
              {mins} min read
            </div>
          </div>
        </div>

        {/* ── CTA box ── */}
        <div className="mt-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-8 text-center text-white">
          <div className="text-4xl mb-3">🧾</div>
          <p className="text-xl font-bold mb-2">Create a professional EU invoice — free</p>
          <p className="text-blue-100 text-sm mb-6">
            No account needed. Correct VAT for your country. Download PDF in 60 seconds.
          </p>
          <Link href="/generator">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold gap-2 px-8">
              Create Free Invoice <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

    </article>
  )
}
