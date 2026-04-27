import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { Heart, Target, Zap, ShieldCheck, Globe, ArrowRight, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us — EuroInvoice | Built for EU Freelancers",
  description:
    "EuroInvoice was built by freelancers, for freelancers. Learn why we created the fastest EU-compliant invoice generator in Europe.",
}

const values = [
  {
    icon: Zap,
    title: "Simplicity First",
    desc: "If it takes more than 2 minutes, we failed. Every design decision prioritises speed and clarity over features nobody uses.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "Legally Correct — Always",
    desc: "EU VAT law is complex. We study it so you don't have to. Every invoice we generate is built to pass scrutiny from any EU tax authority.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Globe,
    title: "Built for Europe",
    desc: "Not a US tool with European VAT bolted on. EuroInvoice was designed specifically for the EU — with all its complexity embraced, not ignored.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Heart,
    title: "Free at the Core",
    desc: "Creating and downloading invoices will always be free. We believe access to legal financial tools shouldn't cost money.",
    color: "bg-pink-50 text-pink-600",
  },
]

const problems = [
  "Spent 30 minutes formatting a Word document for every invoice",
  "Looked up the VAT rate for your country every single time",
  "Wasn't sure whether to charge VAT to an EU client or not",
  "Sent an invoice only to have it rejected — wrong format, missing fields",
  "Paid for expensive accounting software just to generate a simple invoice",
]

const stats = [
  { value: "7",    label: "EU Countries Supported" },
  { value: "60s",  label: "Average Time to Invoice" },
  { value: "100%", label: "Free to Use" },
  { value: "0",    label: "Accounts Required" },
]

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 overflow-hidden py-24 px-4">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-[0.12] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600 rounded-full opacity-[0.10] blur-3xl pointer-events-none" />

        <div className="relative container max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/70 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
            🧾 &nbsp;Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            We were tired of bad invoices.<br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              So we fixed it.
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            EuroInvoice was born out of frustration — freelancers across Europe spending hours on paperwork
            that should take minutes, getting VAT wrong, having invoices rejected, and paying for
            complicated tools that were never designed for the EU in the first place.
          </p>
        </div>
      </section>

      {/* ─── STATS ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-b py-12 px-4">
        <div className="container max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-bold text-gray-900 mb-1">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold text-blue-600 tracking-[0.15em] uppercase">The Problem</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-5">
                EU freelancers deserve better invoicing tools
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                The EU has 27 member states, each with different tax IDs, VAT rates,
                invoice requirements, and rules for cross-border transactions.
                Generic tools treat all of this as an afterthought.
              </p>
              <p className="text-gray-500 leading-relaxed">
                The result? Freelancers waste time researching rules, make mistakes that cost them
                money, and either overpay for accounting software or use clunky spreadsheets.
                We knew there had to be a better way.
              </p>
            </div>
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <p className="text-sm font-bold text-red-600 mb-5 uppercase tracking-wide">Sound familiar?</p>
              <ul className="space-y-4">
                {problems.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="text-red-400 mt-0.5 shrink-0 text-base">✗</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OUR SOLUTION ────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 order-2 md:order-1">
              <p className="text-sm font-bold text-emerald-600 mb-5 uppercase tracking-wide">With EuroInvoice</p>
              <ul className="space-y-4">
                {[
                  "Select your country — tax ID field appears automatically",
                  "VAT rate is pre-filled and correct for your country",
                  "Invoicing an EU business? Reverse charge handled automatically",
                  "Download a legal, professional PDF in under 60 seconds",
                  "No account, no subscription, no credit card needed",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs font-bold text-blue-600 tracking-[0.15em] uppercase">Our Solution</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-5">
                One tool. Every EU country. Every rule. Automatic.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                EuroInvoice is a purpose-built EU invoice generator. We embedded EU VAT law directly
                into the product — so when you pick Spain, you get a Spanish invoice.
                When you pick Germany, you get a German one. Every time. Correctly.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Cross-border invoicing? We detect it automatically and apply reverse charge,
                add the legally required notice, and zero out the VAT — all without
                you needing to know the rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-600 tracking-[0.15em] uppercase">What We Stand For</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-3">Our Values</h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              Everything we build is guided by these four principles.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className={`inline-flex p-3 rounded-xl ${color} mb-4`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO WE BUILD FOR ────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 px-4">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-5">
            Who we build for
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Freelance developers, designers, writers, consultants, and small businesses operating
            in or with the EU. People who are brilliant at their work but shouldn&apos;t need
            an accounting degree just to send an invoice.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["💻 Developers","🎨 Designers","✍️ Writers","📊 Consultants","🏢 Small Agencies","🌍 Remote Workers"].map(tag => (
              <span key={tag} className="bg-white/10 border border-white/15 text-white/80 text-sm font-medium px-4 py-2 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <Link href="/how-it-works">
            <Button size="lg" variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent gap-2 px-8">
              See How It Works <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ─── MISSION ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container max-w-2xl mx-auto text-center">
          <Target className="h-10 w-10 text-blue-600 mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-gray-900 mb-5">Our Mission</h2>
          <p className="text-gray-500 text-xl leading-relaxed mb-10">
            To make professional, legally correct EU invoicing accessible to every freelancer in Europe —
            regardless of their country, language, or accounting knowledge.
            <br /><br />
            <span className="font-semibold text-gray-700">
              Free. Fast. Correct. Always.
            </span>
          </p>
          <Link href="/generator">
            <Button size="lg" className="gap-2 px-10 h-12">
              Create Your First Invoice <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}
