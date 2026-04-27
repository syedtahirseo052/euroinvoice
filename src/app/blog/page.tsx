import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — EuroInvoice | Invoicing Tips for EU Freelancers",
  description: "Guides on EU invoicing, VAT rules, country-specific tax tips and freelance finance advice.",
}

// Revalidate every 60 seconds so new posts appear without redeploying
export const revalidate = 60

async function getPosts() {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
  return data ?? []
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Blog</h1>
        <p className="text-gray-500 text-lg">
          Invoicing guides, EU VAT tips and freelance finance advice.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No posts yet.</p>
          <p className="text-sm mt-1">Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="py-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.created_at)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="text-blue-600 text-sm font-medium inline-flex items-center gap-1">
                    Read more <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
