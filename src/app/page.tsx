import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import {
  ArrowRight, CheckCircle2, Zap, ShieldCheck,
  BadgeEuro, Clock, Download, Globe, ChevronRight, X
} from "lucide-react"

export const metadata: Metadata = {
  title: "EuroInvoice — EU Invoice Generator for Freelancers | VAT Compliant",
  description:
    "Stop getting your invoices rejected. Create VAT-compliant EU invoices in 60 seconds. Correct VAT, reverse charge, country tax IDs — all automatic. Free PDF download.",
  openGraph: {
    title: "EuroInvoice — EU Invoice Generator for Freelancers",
    description: "Stop getting your invoices rejected. VAT-compliant EU invoices in 60 seconds. Free PDF.",
    type: "website",
    images: [{ url: "https://charming-choux-c5a879.netlify.app/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EuroInvoice — EU Invoice Generator",
    description: "Stop getting your invoices rejected. VAT-compliant EU invoices in 60 seconds.",
  },
}

const countries = [
  { flag: "🇪🇸", name: "Spain",       taxId: "NIF",        vat: "21%", href: "/es/plantilla-factura-autonomo-espana" },
  { flag: "🇩🇪", name: "Germany",     taxId: "Steuernr.",  vat: "19%", href: "/de/rechnungsvorlage-freiberufler-deutschland" },
  { flag: "🇫🇷", name: "France",      taxId: "SIRET",      vat: "20%", href: "/fr/modele-facture-auto-entrepreneur-france" },
  { flag: "🇮🇹", name: "Italy",       taxId: "P.IVA",      vat: "22%", href: "/it/modello-fattura-partita-iva-italia" },
  { flag: "🇳🇱", name: "Netherlands", taxId: "BTW-nr",     vat: "21%", href: "/generator" },
  { flag: "🇵🇹", name: "Portugal",    taxId: "NIF",        vat: "23%", href: "/generator" },
  { flag: "🇧🇪", name: "Belgium",     taxId: "BTW/TVA",    vat: "21%", href: "/generator" },
]

const features = [
  { icon: Zap,         title: "60-Second Invoices",        desc: "From blank form to ready-to-send PDF in under a minute.",                    bg: "bg-amber-50",   ic: "text-amber-600"   },
  { icon: ShieldCheck, title: "Built for EU Law",          desc: "All mandatory fields, correct formats — designed for EU VAT law from day 1.", bg: "bg-emerald-50", ic: "text-emerald-600" },
  { icon: BadgeEuro,   title: "Auto VAT + Reverse Charge", desc: "VAT calculated automatically. Cross-border EU invoice? Reverse charge added.", bg: "bg-blue-50",    ic: "text-blue-600"    },
  { icon: Globe,       title: "7 EU Countries",            desc: "Spain, Germany, France, Italy, NL, Portugal, Belgium — and growing.",         bg: "bg-violet-50",  ic: "text-violet-600"  },
  { icon: Download,    title: "Instant PDF Download",      desc: "Clean A4 PDF your clients and accountants will accept without question.",     bg: "bg-orange-50",  ic: "text-orange-600"  },
  { icon: Clock,       title: "Zero Friction",             desc: "No account, no credit card, no setup. Open → fill → download. Done.",         bg: "bg-pink-50",    ic: "text-pink-600"    },
]

const steps = [
  { n: "1", title: "Choose Your Country",  desc: "Select your EU country. Tax ID field and VAT rate load automatically." },
  { n: "2", title: "Fill In Your Details", desc: "Your info, your client, date, line items. Simple form — under 2 minutes." },
  { n: "3", title: "Download Your PDF",    desc: "Click download. Instant professional A4 PDF ready to email your client." },
]

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-[0.15] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-violet-600 rounded-full opacity-[0.12] blur-3xl pointer-events-none" />

        <div className="relative container max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT — copy */}
            <div>
              {/* Competitive badge — strongest line up front */}
              <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
                <ShieldCheck className="h-3.5 w-3.5" /> Built for EU law. Not retrofitted.
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] mb-5">
                Stop getting your<br />invoices{" "}
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  rejected.
                </span>
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed mb-3 max-w-lg">
                EU-compliant freelancer invoices in{" "}
                <span className="text-white font-semibold">60 seconds.</span>{" "}
                VAT, reverse-charge, and country tax IDs — all automatic.
              </p>
              <p className="text-slate-400 text-sm mb-8 max-w-md">
                Spain, Germany, France, Italy + 3 more EU countries.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-9">
                <Link href="/generator">
                  <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 w-full sm:w-auto text-base shadow-lg shadow-blue-900/40">
                    Create Free Invoice <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent px-8 h-12 w-full sm:w-auto text-base">
                    How it Works
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-slate-400">
                {["No account needed", "Free PDF download", "Always free"].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — invoice card mockup */}
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl rotate-3 opacity-20 scale-105" />
                <div className="absolute inset-0 bg-violet-500 rounded-2xl -rotate-2 opacity-10 scale-102" />
                <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[320px]">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <p className="text-[10px] font-bold text-gray-300 tracking-[0.15em] mb-0.5">INVOICE</p>
                      <p className="text-lg font-bold text-gray-900">#INV-2025-042</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">📤 Sent</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 mb-4">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] text-gray-400 mb-1.5 font-medium">FROM</p>
                      <p className="font-semibold text-gray-900 text-xs">María R.</p>
                      <p className="text-gray-400 text-[10px]">NIF: 12345678A</p>
                      <p className="text-[10px] mt-0.5">🇪🇸 Spain</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] text-gray-400 mb-1.5 font-medium">TO</p>
                      <p className="font-semibold text-gray-900 text-xs">Acme GmbH</p>
                      <p className="text-gray-400 text-[10px]">VAT: DE1234567</p>
                      <p className="text-[10px] mt-0.5">🇩🇪 Germany</p>
                    </div>
                  </div>
                  <div className="border-t border-b py-3 mb-3 space-y-2">
                    <div className="flex justify-between text-xs text-gray-700">
                      <span>Web Development (40h)</span>
                      <span className="font-semibold">€2,000</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>Reverse charge — VAT 0%</span>
                      <span>€0.00</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-gray-400 font-medium">Total Due</span>
                    <span className="text-2xl font-bold text-gray-900">€2,000</span>
                  </div>
                  <div className="bg-blue-600 text-white text-xs font-semibold text-center py-2.5 rounded-xl flex items-center justify-center gap-1.5">
                    <Download className="h-3.5 w-3.5" /> Download PDF Invoice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM / SOLUTION ──────────────────────────────────────── */}
      <section className="bg-white border-b py-14 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Before */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                  <X className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-sm font-bold text-red-700 uppercase tracking-wider">Today, without EuroInvoice</span>
              </div>
              <ul className="space-y-3 text-sm text-red-800">
                <li className="flex items-start gap-2.5"><span className="text-red-400 mt-0.5 shrink-0">✗</span> 30+ minutes in Word or Excel per invoice</li>
                <li className="flex items-start gap-2.5"><span className="text-red-400 mt-0.5 shrink-0">✗</span> Wrong VAT rate — your accountant rejects it</li>
                <li className="flex items-start gap-2.5"><span className="text-red-400 mt-0.5 shrink-0">✗</span> Forget reverse-charge on EU cross-border invoices</li>
                <li className="flex items-start gap-2.5"><span className="text-red-400 mt-0.5 shrink-0">✗</span> Missing tax ID format required by your country</li>
                <li className="flex items-start gap-2.5"><span className="text-red-400 mt-0.5 shrink-0">✗</span> Client delays payment because invoice is non-compliant</li>
              </ul>
            </div>

            {/* After */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">With EuroInvoice</span>
              </div>
              <ul className="space-y-3 text-sm text-emerald-800">
                <li className="flex items-start gap-2.5"><span className="text-emerald-500 mt-0.5 shrink-0">✓</span> 60 seconds from open to downloaded PDF</li>
                <li className="flex items-start gap-2.5"><span className="text-emerald-500 mt-0.5 shrink-0">✓</span> Correct VAT rate for your country, auto-filled</li>
                <li className="flex items-start gap-2.5"><span className="text-emerald-500 mt-0.5 shrink-0">✓</span> Reverse charge added automatically for EU clients</li>
                <li className="flex items-start gap-2.5"><span className="text-emerald-500 mt-0.5 shrink-0">✓</span> Country-specific tax ID fields (NIF, SIRET, P.IVA…)</li>
                <li className="flex items-start gap-2.5"><span className="text-emerald-500 mt-0.5 shrink-0">✓</span> Accountant-approved. Correct every time.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-600 tracking-[0.15em] uppercase">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-3">
              Three steps. One perfect invoice.
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              No learning curve. No accountant needed. Just fill in the blanks and download.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-9 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-blue-200 via-violet-300 to-blue-200" />
            {steps.map(({ n, title, desc }, i) => (
              <div key={n} className="relative text-center group">
                <div className="relative inline-flex items-center justify-center w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white text-2xl font-bold mb-6 shadow-lg shadow-blue-200 group-hover:shadow-xl group-hover:shadow-blue-300 transition-all mx-auto">
                  {n}
                  {i < 2 && <ChevronRight className="hidden md:block absolute -right-10 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300" />}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/generator">
              <Button size="lg" className="gap-2 px-10 h-12 text-base">
                Try It Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-600 tracking-[0.15em] uppercase">Why EuroInvoice</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-3">
              Built for EU law. Not retrofitted.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Generic invoice tools don&apos;t understand EU VAT. We were designed from the ground up for it.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, bg, ic }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                <div className={`inline-flex p-3 rounded-xl ${bg} mb-4`}>
                  <Icon className={`h-5 w-5 ${ic}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COUNTRIES ───────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-600 tracking-[0.15em] uppercase">Country Support</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-3">
              The right format for every EU country
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              7 EU countries. Each has unique tax IDs, VAT rates, and legal requirements. We handle every one.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map(({ flag, name, taxId, vat, href }) => (
              <Link key={name} href={href}>
                <div className="group bg-white border rounded-2xl p-5 text-center hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                  <div className="text-4xl mb-3">{flag}</div>
                  <div className="font-bold text-gray-900 text-sm mb-2">{name}</div>
                  <div className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-lg mb-1">{taxId}</div>
                  <div className="text-xs text-gray-400">VAT {vat}</div>
                </div>
              </Link>
            ))}
            <div className="border-2 border-dashed rounded-2xl p-5 text-center flex flex-col items-center justify-center">
              <div className="text-3xl mb-1">🌍</div>
              <div className="text-sm font-semibold text-gray-300">More soon</div>
              <div className="text-xs text-gray-200">All EU</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF — stats instead of fake quote ──────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-2">Why freelancers choose us</p>
            <h2 className="text-3xl font-bold text-white">The numbers speak for themselves</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "7",     label: "EU Countries",        sub: "Spain, DE, FR, IT + 3 more" },
              { value: "60s",   label: "To generate",         sub: "From open to PDF download"  },
              { value: "€0",    label: "Always free",         sub: "No credit card needed"      },
              { value: "100%",  label: "VAT compliant",       sub: "Built for EU law"           },
            ].map(({ value, label, sub }) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-bold text-white mb-1">{value}</p>
                <p className="text-blue-300 text-sm font-semibold mb-1">{label}</p>
                <p className="text-slate-500 text-xs">{sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/generator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 gap-2 px-8 h-12">
                Create Your First Invoice Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PRICING TEASER ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 tracking-[0.15em] uppercase">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-3">Start free. Upgrade when ready.</h2>
            <p className="text-gray-500 text-lg">Invoice generation is free forever. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border p-8">
              <p className="text-xs font-bold text-gray-300 tracking-widest uppercase mb-3">Free</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">€0</p>
              <p className="text-gray-400 text-sm mb-7">Forever · no credit card</p>
              <ul className="space-y-3 mb-8">
                {["Create & download PDF invoices", "All 7 EU countries", "VAT & reverse charge auto-calculated", "Unlimited invoices"].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/generator"><Button variant="outline" className="w-full h-11">Start for Free</Button></Link>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-5 right-5 bg-white/25 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">POPULAR</div>
              <p className="text-xs font-bold text-blue-200 tracking-widest uppercase mb-3">Pro</p>
              <p className="text-4xl font-bold text-white mb-1">€19</p>
              <p className="text-blue-200 text-sm mb-2">per month · cancel anytime</p>
              {/* One killer feature lead */}
              <div className="bg-white/15 rounded-xl px-4 py-3 mb-5">
                <p className="text-white font-semibold text-sm">📬 Send invoices & track payment status</p>
                <p className="text-blue-200 text-xs mt-1">Know exactly when your client receives and pays. No more chasing.</p>
              </div>
              <ul className="space-y-3 mb-8">
                {["Everything in Free", "Full invoice history & records", "Client management"].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-blue-100">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/pricing"><Button className="w-full h-11 bg-white text-blue-600 hover:bg-blue-50 font-semibold">See Pro Plan</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">🧾</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your next invoice is 60 seconds away</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto">
            No account. No credit card. No complicated settings. Open the generator, fill in the blanks, download your PDF.
          </p>
          <Link href="/generator">
            <Button size="lg" className="gap-2 px-12 h-14 text-base shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-shadow bg-blue-600 hover:bg-blue-700">
              Create Free Invoice <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-gray-400 text-sm mt-5">Takes less than 2 minutes · Used by freelancers across Europe</p>
        </div>
      </section>

    </div>
  )
}
