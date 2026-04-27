import Link from "next/link"
import { FileText, Mail } from "lucide-react"

const countries = [
  { flag: "🇪🇸", label: "Spain",       href: "/es/plantilla-factura-autonomo-espana" },
  { flag: "🇩🇪", label: "Germany",     href: "/de/rechnungsvorlage-freiberufler-deutschland" },
  { flag: "🇫🇷", label: "France",      href: "/fr/modele-facture-auto-entrepreneur-france" },
  { flag: "🇮🇹", label: "Italy",       href: "/it/modello-fattura-partita-iva-italia" },
  { flag: "🇳🇱", label: "Netherlands", href: "/generator" },
  { flag: "🇵🇹", label: "Portugal",    href: "/generator" },
  { flag: "🇧🇪", label: "Belgium",     href: "/generator" },
]

export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 mt-auto">
      <div className="container max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-3">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <FileText className="h-4 w-4 text-white" />
              </div>
              EuroInvoice
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed mb-4">
              VAT-compliant invoices for EU freelancers in 60 seconds. 7 countries. Always free.
            </p>
            <p className="text-xs text-slate-500 font-medium">🇪🇺 Made in Europe</p>
            <a
              href="mailto:support@euroinvoice.eu"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 mt-3 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              support@euroinvoice.eu
            </a>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h3 className="font-semibold text-sm text-white mb-4">Product</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/generator"    className="hover:text-white transition-colors">Invoice Generator</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
              <li><Link href="/pricing"      className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/blog"         className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/about"        className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <h3 className="font-semibold text-sm text-white mb-4">Legal</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/terms"   className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/imprint" className="hover:text-white transition-colors">Imprint / Impressum</Link></li>
            </ul>
          </div>

          {/* Col 4 — Countries */}
          <div>
            <h3 className="font-semibold text-sm text-white mb-4">Countries</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {countries.map(({ flag, label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors flex items-center gap-2">
                    <span>{flag}</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EuroInvoice. Free EU invoice generator for freelancers.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300">Privacy</Link>
            <Link href="/terms"   className="hover:text-slate-300">Terms</Link>
            <Link href="/imprint" className="hover:text-slate-300">Imprint</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
