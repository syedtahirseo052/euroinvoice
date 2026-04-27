import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle, X } from "lucide-react"

const FREE_FEATURES = [
  "Unlimited PDF invoice generation",
  "All EU country tax fields",
  "7 languages (EN, ES, DE, FR, IT, NL, PL)",
  "Line items with VAT calculation",
  "IBAN bank details on invoice",
  "Reverse-charge VAT detection",
]

const FREE_MISSING = [
  "Save invoices to your account",
  "Send invoices by email",
  "Recurring auto-send",
  "Logo upload",
  "Payment status tracking",
  "All 24 EU languages",
]

const PRO_FEATURES = [
  "Everything in Free",
  "Save invoices to your account",
  "Send invoices directly by email",
  "Auto-recurring invoices (monthly, quarterly)",
  "Logo upload & custom branding",
  "Payment status tracking (draft / sent / paid)",
  "All 24 EU languages",
  "Invoice history & dashboard",
  "Priority support",
]

export default function PricingPage() {
  return (
    <div className="container max-w-5xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Free forever for basic invoicing. Upgrade to Pro when you need to save, send, and automate.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
        {/* Free */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>For freelancers getting started</CardDescription>
            <div className="mt-4">
              <span className="text-5xl font-bold text-gray-900">€0</span>
              <span className="text-gray-500 ml-2">/ forever</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {FREE_FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
            {FREE_MISSING.map((f) => (
              <div key={f} className="flex items-start gap-3 opacity-40">
                <X className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-500">{f}</span>
              </div>
            ))}
          </CardContent>

          <CardFooter>
            <Link href="/generator" className="w-full">
              <Button variant="outline" className="w-full" size="lg">
                Start for Free
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Pro */}
        <Card className="border-2 border-blue-500 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </span>
          </div>

          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Pro</CardTitle>
            <CardDescription>For serious freelancers who invoice regularly</CardDescription>
            <div className="mt-4">
              <span className="text-5xl font-bold text-gray-900">€19</span>
              <span className="text-gray-500 ml-2">/ month</span>
            </div>
            <p className="text-sm text-green-600 font-medium">
              Or €190/year — save 2 months free
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {PRO_FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Link href="/login?plan=pro" className="w-full">
              <Button className="w-full" size="lg">
                Start Pro — €19/month
              </Button>
            </Link>
            <Link href="/login?plan=pro&interval=year" className="w-full">
              <Button variant="outline" className="w-full" size="sm">
                Annual — €190/year (save €38)
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* ROI section */}
      <div className="bg-blue-50 rounded-2xl p-8 text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Pro pays for itself in the first hour
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          EU freelancers spend 1–2 hours per week on invoicing. Auto-recurring invoices alone save you 8+ hours/month.
          At your hourly rate, that&apos;s €200–€800 of time saved — for €19/month.
        </p>
        <Link href="/login?plan=pro">
          <Button>Get Pro — €19/month</Button>
        </Link>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently asked questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Do I need an account to create invoices?",
              a: "No. You can generate and download invoices as PDF without any account. Create an account only if you want to save invoices, send by email, or set up recurring invoices.",
            },
            {
              q: "Can I cancel my Pro subscription anytime?",
              a: "Yes. Cancel any time from your account settings. You keep Pro access until the end of your billing period.",
            },
            {
              q: "Which countries are supported?",
              a: "All 27 EU member states. Each country has the correct tax ID field (NIF, Steuernummer, SIRET, Partita IVA, BTW, NIP, etc.) and pre-configured VAT rates.",
            },
            {
              q: "Is the PDF invoice legally valid in my country?",
              a: "EuroInvoice generates invoices with all EU-required fields. Always verify with your local accountant that your invoice meets your country's specific requirements.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b pb-5">
              <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
              <p className="text-gray-500 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
