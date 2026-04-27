// POST /api/stripe/webhook
// Stripe calls this after successful payment.
// Updates user's plan to "pro" in Supabase.

import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
})

// Use service role key for server-side DB writes (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("Webhook signature failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle subscription created or activated
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId

    if (userId) {
      // Upgrade user to Pro in profiles table
      await supabaseAdmin
        .from("profiles")
        .update({ plan: "pro" })
        .eq("id", userId)

      // Save subscription record
      await supabaseAdmin
        .from("subscriptions")
        .upsert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          plan: "pro",
          status: "active",
        })
    }
  }

  // Handle subscription cancelled
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription

    await supabaseAdmin
      .from("subscriptions")
      .update({ plan: "free", status: "canceled" })
      .eq("stripe_subscription_id", subscription.id)

    // Downgrade user back to free
    const { data } = await supabaseAdmin
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", subscription.id)
      .single()

    if (data?.user_id) {
      await supabaseAdmin
        .from("profiles")
        .update({ plan: "free" })
        .eq("id", data.user_id)
    }
  }

  return NextResponse.json({ received: true })
}
