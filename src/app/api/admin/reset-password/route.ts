// POST /api/admin/reset-password
// Sends a password-reset email to the given address via Supabase Auth.
// The user clicks the link → lands on /reset-password → sets a new password.

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://charming-choux-c5a879.netlify.app"

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 })

  // generateLink creates a recovery link and Supabase emails it automatically
  const { error } = await supabaseAdmin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: `${APP_URL}/reset-password` },
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
