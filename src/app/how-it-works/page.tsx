import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import {
  Globe, FileText, Download, CheckCircle2, ShieldCheck,
  Zap, Clock, BadgeEuro, Users, ArrowRight, Star
} from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works — EuroInvoice | Create EU Invoices in 60 Seconds",
  description:
    "Learn how EuroInvoice works. Fill in your details, pick your EU country, download a VAT-compliant PDF invoice — no account needed, completely free.",
}

const steps = [
  {
    number: "01",
    icon: Globe,
    color: "bg-blue-500",
    light: "bg-blue-50 text-blue-600",
    title: "Choose Your Country",
    desc: "Select your EU country from the list. EuroInvoice automatically loads the correct tax ID field (NIF for Spain, Steuernummer for Germany, SIRET for France, etc.), the right VAT rate, and the invoice format required by law in your country.",
    detail: "Supports 🇪🇸 Spain · 🇩🇪 Germany · 🇫🇷 France · 🇮🇹 Italy · 🇳🇱 Netherlands · 🇵🇹 Portugal · 🇧🇪 Belgium",
  },
  {
    number: "02",
    icon: FileText,
    color: "bg-violet-500",
    light: "bg-violet-50 text-violet-600",
    title: "Fill In Your Details",
    desc: "Enter your name or company name, your client's information, invoice number, due date, and line items (services or products). The form is simple and guides you through every field — no accounting knowledge needed.",
    detail: "Takes less than 2 minutes for a complete, professional invoice.",
  },
  {
    number: "03",
    icon: BadgeEuro,
    color: "bg-emerald-500",
    light: "bg-emerald-50 text-emerald-600",
    title: "VAT Is Calculated Automatically",
    desc: "EuroInvoice applies the correct VAT rate for your country and detects reverse-charge situations (when you invoice a business in another EU country). The VAT breakdown appears on the invoice exactly as required by EU law.",
    detail: "Reverse-charge, intra-community VAT, and zero-rate all handled correctly.",
  },
  {
    number: "04",
    icon: Download,
    color: "bg-orange-500",
    light: "bg-orange-50 text-orange-600",
    title: "Download Your PDF",
    desc: "Click \"Download PDF\" and your invoice is generated instantly on our servers — a clean, professional A4 PDF with your logo area, all tax details, and a proper EU invoice layout. Ready to email to your client immediately.",
    detail: "No watermarks. No email required. No account needed on the free plan.",
  },
]

const benefits = [
  { icon: Zap, title: "Ready in 60 seconds", desc: "Faster than any word processor or spreadsheet template." },
  { icon: ShieldCheck, title: "EU-compliant by default", desc: "Every invoice meets the legal requirements of the selected country." },
  { icon: Globe, title: "7 EU countries supported", desc: "Correct tax IDs, VAT rates, and formats for each country." },
  { icon: Clock, title: "No account needed", desc: "Just open the generator, fill in your details, and download." },
  { icon: BadgeEuro, title: "Handles reverse-charge VAT", desc: "Invoicing a foreign EU business? We add the correct reverse-charge notice." },
  { icon: FileText, title: "Professional PDF output", desc: "Clean A4 layout your clients and accountants will accept without question." },
]

const forWho = [
  { emoji: "💻", title: "Freelance Developers", desc: "Invoice your EU clients correctly without hiring an accountant." },
  { emoji: "🎨", title: "Designers & Creatives", desc: "Look professional with a proper VAT invoice, not a Word file." },
  { emoji: "✍️", title: "Writers & Consultants", desc: "Generate invoices in seconds so you can focus on client work." },
  { emoji: "🏢", title: "Small Businesses", desc: "Handle cross-border EU invoicing without expensive software." },
  { emoji: "🌍", title: "Remote Workers", desc: "Works for any freelancer based or working in the EU." },
  { emoji: "📊", title: "Agencies", desc: "Invoice multiple EU clients with the right format for each country." },
]

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No. You can generate and download a PDF invoice without creating an account. An account is only needed if you want to save your invoices and access them later (Pro feature).",
  },
  {
    q: "Is the invoice legally valid?",
    a: "Yes. EuroInvoice generates invoices that comply with EU VAT Directive 2006/112/EC and the specific formatting requirements of each supported country. The invoice includes all legally required fields.",
  },
  {
    q: "What is reverse-charge VAT?",
    a: "When you (a VAT-registered business) invoice another VAT-registered business in a different EU country, VAT is not charged — instead, the buyer pays it to their own tax authority. EuroInvoice detects this automatically and adds the required reverse-charge notice to your invoice.",
  },
  {
    q: "Is it really free?",
    a: "Yes. Creating and downloading invoices is completely free. The Pro plan (€19/month) adds saved invoice history and client management — but the core invoice generator is always free.",
  },
  {
    q: "Which countries are supported?",
    a: "Spain, Germany, France, Italy, Netherlands, Portugal, and Belgium. More countries are being added regularly.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="container max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-5">
            <Zap className="h-3 w-3" /> Simple. Fast. EU-compliant.
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Create a professional EU invoice<br className="hidden md:block" /> in under 60 seconds
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            EuroInvoice is built for EU freelancers who want to spend less time on paperwork and more time on work.
            Pick your country, fill in your details, download a legal PDF — done.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/generator">
              <Button size="lg" className="gap-2 px-8">
                Create Free Invoice <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="px-8">See Pricing</Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> No account needed</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Always free</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Legal PDF</span>
          </div>
        </div>
      </section>

      {/* ── 4 STEPS ──────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works — 4 simple steps</h2>
            <p className="text-gray-500">From zero to a professional invoice PDF in under a minute.</p>
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="flex gap-6 items-start">
                  {/* Number + line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`${step.color} text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-md`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-100 mt-2" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-gray-300 tracking-widest">STEP {step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-3">{step.desc}</p>
                    <div className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg ${step.light}`}>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {step.detail}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generator">
              <Button size="lg" className="gap-2 px-10">
                Try It Now — It&apos;s Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why freelancers choose EuroInvoice</h2>
            <p className="text-gray-500">Built specifically for the EU — not a generic tool with European settings bolted on.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border hover:shadow-md transition-shadow">
                <div className="p-2.5 bg-blue-50 rounded-xl w-fit mb-4">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Who is EuroInvoice for?</h2>
            <p className="text-gray-500">If you work as a freelancer or small business in the EU, this tool was made for you.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forWho.map(({ emoji, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl border hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <span className="text-3xl shrink-0">{emoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / SOCIAL PROOF ───────────────────── */}
      <section className="bg-blue-600 py-16 px-4">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-300 fill-yellow-300" />)}
          </div>
          <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-6">
            &ldquo;I used to spend 30 minutes making invoices in Word. Now I do it in 90 seconds and the VAT is always correct. My accountant stopped complaining.&rdquo;
          </blockquote>
          <p className="text-blue-200 text-sm">— Carlos M., Freelance Developer · Madrid, Spain</p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5 shrink-0">Q.</span>
                  {q}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed pl-5">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container max-w-xl mx-auto text-center">
          <Users className="h-10 w-10 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to send your first invoice?</h2>
          <p className="text-gray-500 mb-8">
            Join thousands of EU freelancers who create professional invoices in seconds.
            No account needed. No credit card. Free forever.
          </p>
          <Link href="/generator">
            <Button size="lg" className="gap-2 px-10">
              Create My Invoice <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
