// POST /api/stripe/checkout
// Creates a Stripe Checkout session and returns the redirect URL.
// User is sent to Stripe's hosted payment page.

import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://charming-choux-c5a879.netlify.app"

export async function POST(req: NextRequest) {
  try {
    const { userId, email, plan } = await req.json()

    // Create Stripe Checkout session
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
      // Pass userId so webhook can update the DB after payment
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
