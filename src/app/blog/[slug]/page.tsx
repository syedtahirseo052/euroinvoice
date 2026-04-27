import { notFound } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const revalidate = 60

async function getPost(slug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()
  return data
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — EuroInvoice Blog`,
    description: post.excerpt ?? post.content.slice(0, 155),
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  })
}

// Renders plain text content — line breaks become paragraphs
function renderContent(content: string) {
  return content.split("\n\n").map((para, i) => (
    <p key={i} className="mb-4 leading-relaxed text-gray-700">
      {para}
    </p>
  ))
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <article className="container max-w-2xl mx-auto py-12 px-4">
      {/* Back link */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-600 mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      {/* Post header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <Calendar className="h-3 w-3" />
          {formatDate(post.created_at)}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-xl text-gray-500 leading-relaxed border-l-4 border-blue-200 pl-4">
            {post.excerpt}
          </p>
        )}
      </div>

      {/* Post content */}
      <div className="prose-sm text-base">
        {renderContent(post.content)}
      </div>

      {/* CTA at bottom */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
        <p className="font-semibold text-gray-900 mb-2">
          Create a professional EU invoice — free
        </p>
        <p className="text-gray-500 text-sm mb-4">
          No account needed. Download PDF in seconds.
        </p>
        <Link href="/generator">
          <Button>Create Free Invoice →</Button>
        </Link>
      </div>
    </article>
  )
}
