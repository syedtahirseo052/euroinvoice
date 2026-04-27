// Admin-only route to insert/upsert a blog post using service role key
// POST /api/admin/insert-post  { ...postData }

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey || serviceKey === "your-supabase-service-role-key") {
    return NextResponse.json({ error: "Service role key not configured" }, { status: 503 })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey
  )

  const body = await req.json()
  const { slug, ...rest } = body

  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .upsert({ slug, ...rest }, { onConflict: "slug" })
    .select("id, slug, title")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, post: data })
}
