import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — EuroInvoice | Invoicing Tips for EU Freelancers",
  description:
    "Guides on EU invoicing, VAT rules, country-specific tax tips and freelance finance advice.",
}

export const revalidate = 60

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
]

async function getPosts() {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, image_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
  return data ?? []
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  })
}

function readTime(excerpt: string) {
  const words = (excerpt ?? "").split(" ").length
  return Math.max(3, Math.ceil(words / 200))
}

export default async function BlogPage() {
  const posts = await getPosts()
  const [featured, ...rest] = posts

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero header ── */}
      <section className="bg-slate-900 py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            EuroInvoice Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Invoicing Guides for EU Freelancers
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            VAT rules, country-specific tax tips, and practical invoicing advice
            for freelancers across Europe.
          </p>
        </div>
      </section>

      <div className="container max-w-5xl mx-auto px-4 py-16">

        {posts.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">📝</p>
            <p className="text-lg font-medium">No posts yet.</p>
            <p className="text-sm mt-1">Check back soon!</p>
          </div>
        ) : (
          <>
            {/* ── Featured post ── */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block mb-14">
                <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                    <Image
                      src={featured.image_url || FALLBACK_IMAGES[0]}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      FEATURED
                    </span>
                  </div>
                  {/* Content */}
                  <div className="bg-white p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(featured.created_at)}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {readTime(featured.excerpt)} min read
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                        {featured.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold group-hover:gap-3 transition-all">
                      Read Article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* ── Rest of posts grid ── */}
            {rest.length > 0 && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">More Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, idx) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                      <article className="bg-white rounded-2xl border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.image_url || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.created_at)}
                            <span>·</span>
                            <Clock className="h-3 w-3" />
                            {readTime(post.excerpt)} min
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug flex-1">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                          <span className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-semibold group-hover:gap-2.5 transition-all mt-auto">
                            Read More <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* ── CTA ── */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-8 text-center text-white">
          <p className="text-xl font-bold mb-2">Ready to create your EU invoice?</p>
          <p className="text-blue-100 text-sm mb-5">Free PDF download. No account needed.</p>
          <Link href="/generator"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Create Free Invoice <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
