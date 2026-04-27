// POST /api/stripe/checkout
// Creates a Stripe Checkout session and returns the redirect URL.

import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://charming-choux-c5a879.netlify.app"

export async function POST(req: NextRequest) {
  // Lazy-init Stripe so missing key doesn't crash the build
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 503 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-04-22.dahlia",
  })

  try {
    const { userId, email, plan } = await req.json()

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: plan === "yearly"
            ? process.env.STRIPE_PRO_ANNUAL_PRICE_ID!
            : process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: { userId },
      success_url: `${APP_URL}/dashboard?upgraded=true`,
      cancel_url: `${APP_URL}/pricing?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
