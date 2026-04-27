// Admin-only API routes for user management
// Uses Supabase service role key — never expose this on the client side

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ── GET /api/admin/users — list all users ────────────────────────────────────
export async function GET() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Fetch plan info from profiles table
  const { data: profiles } = await supabaseAdmin
    .from("profiles")
    .select("id, plan")

  const planMap: Record<string, string> = {}
  for (const p of profiles ?? []) {
    planMap[p.id] = p.plan ?? "free"
  }

  const users = data.users.map((u) => ({
    id: u.id,
    email: u.email ?? "",
    created_at: u.created_at,
    plan: planMap[u.id] ?? "free",
  }))

  return NextResponse.json({ users })
}

// ── POST /api/admin/users — create a new user ────────────────────────────────
export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // auto-confirm so they can log in immediately
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Create a matching profiles row
  await supabaseAdmin.from("profiles").upsert({
    id: data.user.id,
    email,
    plan: "free",
  })

  return NextResponse.json({ user: { id: data.user.id, email: data.user.email } })
}

// ── DELETE /api/admin/users?id=UUID — delete a user ─────────────────────────
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) return NextResponse.json({ error: "User ID required." }, { status: 400 })

  const { error } = await supabaseAdmin.auth.admin.deleteUser(id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Also remove profile row
  await supabaseAdmin.from("profiles").delete().eq("id", id)

  return NextResponse.json({ success: true })
}
