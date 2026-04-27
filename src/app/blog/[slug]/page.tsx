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

function renderInline(text: string) {
  // Handle **bold** and *italic* inline
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>
    return part
  })
}

function renderContent(content: string) {
  const blocks = content.split("\n\n")
  const elements: React.ReactNode[] = []

  for (let i = 0; i < blocks.length; i++) {
    const raw = blocks[i].trim()
    if (!raw) continue

    // ── Markdown headings: # ## ### #### ##### ######
    if (/^#{1,6}\s/.test(raw)) {
      const level = raw.match(/^(#+)/)?.[1].length ?? 2
      const text  = raw.replace(/^#+\s+/, "")
      const cls: Record<number, string> = {
        1: "text-3xl font-bold text-gray-900 mt-12 mb-4",
        2: "text-2xl font-bold text-gray-900 mt-10 mb-3 border-l-4 border-blue-500 pl-4",
        3: "text-xl font-bold text-gray-900 mt-8 mb-3",
        4: "text-lg font-semibold text-gray-800 mt-6 mb-2",
        5: "text-base font-semibold text-gray-700 mt-5 mb-2",
        6: "text-sm font-semibold text-gray-600 mt-4 mb-2 uppercase tracking-wider",
      }
      const Tag = `h${level}` as keyof JSX.IntrinsicElements
      elements.push(
        <Tag key={i} className={cls[level] ?? cls[2]}>
          {renderInline(text)}
        </Tag>
      )
      continue
    }

    // ── ALL-CAPS line → h2 (backward compat for old posts)
    const isAllCaps = raw === raw.toUpperCase() && raw.length > 5 && raw.length < 100 && /^[A-Z]/.test(raw) && !/^[-•*]/.test(raw)
    if (isAllCaps) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-3 border-l-4 border-blue-500 pl-4">
          {raw}
        </h2>
      )
      continue
    }

    // ── Bullet list block (lines starting with - or • or *)
    const lines = raw.split("\n")
    const isList = lines.every(l => /^[-•*]\s/.test(l.trim()) || l.trim() === "")
    if (isList) {
      elements.push(
        <ul key={i} className="list-disc pl-6 mb-5 space-y-1.5">
          {lines.filter(l => l.trim()).map((l, j) => (
            <li key={j} className="text-gray-600 text-base leading-relaxed">
              {renderInline(l.replace(/^[-•*]\s+/, ""))}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // ── Numbered list block (lines starting with 1. 2. etc.)
    const isNumbered = lines.every(l => /^\d+\.\s/.test(l.trim()) || l.trim() === "")
    if (isNumbered) {
      elements.push(
        <ol key={i} className="list-decimal pl-6 mb-5 space-y-1.5">
          {lines.filter(l => l.trim()).map((l, j) => (
            <li key={j} className="text-gray-600 text-base leading-relaxed">
              {renderInline(l.replace(/^\d+\.\s+/, ""))}
            </li>
          ))}
        </ol>
      )
      continue
    }

    // ── Blockquote (line starts with >)
    if (raw.startsWith(">")) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-blue-400 bg-blue-50 pl-5 pr-4 py-3 mb-5 rounded-r-xl italic text-gray-700">
          {renderInline(raw.replace(/^>\s*/, ""))}
        </blockquote>
      )
      continue
    }

    // ── Horizontal rule ---
    if (/^---+$/.test(raw)) {
      elements.push(<hr key={i} className="my-8 border-gray-200" />)
      continue
    }

    // ── Regular paragraph
    elements.push(
      <p key={i} className="mb-5 leading-relaxed text-gray-600 text-base">
        {renderInline(raw)}
      </p>
    )
  }

  return elements
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

        {/* Body — HTML (from rich editor) or plain text/markdown */}
        {post.content?.trimStart().startsWith("<") ? (
          <div
            className="prose prose-gray prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
              prose-h4:text-lg prose-h4:mt-5 prose-h4:mb-2
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:pl-6 prose-ul:space-y-1 prose-ul:text-gray-600
              prose-ol:pl-6 prose-ol:space-y-1 prose-ol:text-gray-600
              prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-blue-700
              prose-hr:my-8 prose-hr:border-gray-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="prose-custom">
            {renderContent(post.content)}
          </div>
        )}

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
