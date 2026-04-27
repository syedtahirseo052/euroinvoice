import Link from "next/link"
import { FileText } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 mb-3">
              <FileText className="h-5 w-5" />
              EuroInvoice
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              Professional invoices for EU freelancers. Country-specific tax fields, 24 languages, free PDF download.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/generator" className="hover:text-blue-600">Invoice Generator</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Countries</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/es/plantilla-factura-autonomo-espana" className="hover:text-blue-600">🇪🇸 Spain</Link></li>
              <li><Link href="/de/rechnungsvorlage-freiberufler-deutschland" className="hover:text-blue-600">🇩🇪 Germany</Link></li>
              <li><Link href="/fr/modele-facture-auto-entrepreneur-france" className="hover:text-blue-600">🇫🇷 France</Link></li>
              <li><Link href="/it/modello-fattura-partita-iva-italia" className="hover:text-blue-600">🇮🇹 Italy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} EuroInvoice. Free invoice generator for EU freelancers.
        </div>
      </div>
    </footer>
  )
}
