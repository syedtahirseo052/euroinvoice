import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, FileText, Globe, Zap } from "lucide-react"

const COUNTRIES = [
  { code: "ES", flag: "🇪🇸", name: "Spain", slug: "/es/plantilla-factura-autonomo-espana" },
  { code: "DE", flag: "🇩🇪", name: "Germany", slug: "/de/rechnungsvorlage-freiberufler-deutschland" },
  { code: "FR", flag: "🇫🇷", name: "France", slug: "/fr/modele-facture-auto-entrepreneur-france" },
  { code: "IT", flag: "🇮🇹", name: "Italy", slug: "/it/modello-fattura-partita-iva-italia" },
  { code: "NL", flag: "🇳🇱", name: "Netherlands", slug: "/nl/factuur-zzp-voorbeeld-nederland" },
  { code: "PL", flag: "🇵🇱", name: "Poland", slug: "/pl/faktura-freelancer-wzor-polska" },
  { code: "IE", flag: "🇮🇪", name: "Ireland", slug: "/en/freelance-invoice-template-ireland" },
]

const FEATURES = [
  {
    icon: <FileText className="h-6 w-6 text-blue-600" />,
    title: "Country-correct tax fields",
    desc: "NIF for Spain, Steuernummer for Germany, SIRET for France — auto-shown based on your country.",
  },
  {
    icon: <Globe className="h-6 w-6 text-blue-600" />,
    title: "24 EU languages",
    desc: "Generate invoices in your client's language. Spanish, German, French, Italian, Dutch, Polish and more.",
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    title: "Free PDF download",
    desc: "No account required. Fill in your details, download your professional invoice in seconds.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
            🇪🇺 Built for EU freelancers
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Professional invoices for{" "}
            <span className="text-blue-600">EU freelancers</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create invoices with the correct tax fields for your country — NIF, Steuernummer, SIRET, Partita IVA and more.
            Free PDF download, no account needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generator">
              <Button size="lg" className="text-lg px-8 py-6">
                Create Free Invoice →
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                See Pro Features
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Free forever for PDF downloads · No credit card required
          </p>
        </div>
      </section>

      {/* Country Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
            Pick your country, get the right invoice
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Each template pre-fills the correct VAT rates and tax ID fields for your country.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {COUNTRIES.map((country) => (
              <Link key={country.code} href={country.slug}>
                <Card className="hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                    <span className="text-4xl">{country.flag}</span>
                    <span className="font-medium text-gray-800 text-sm">{country.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}

            <Link href="/generator">
              <Card className="hover:border-blue-400 hover:shadow-md transition-all cursor-pointer border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                  <span className="text-4xl">🇪🇺</span>
                  <span className="font-medium text-gray-500 text-sm">+ 20 more</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Why EU freelancers choose EuroInvoice
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">{f.icon}</div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Everything American tools get wrong for EU freelancers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
            {[
              "Correct VAT rates per country",
              "NIF, Steuernummer, SIRET, Partita IVA fields",
              "Reverse-charge for EU B2B clients",
              "Invoices in 24 EU languages",
              "IBAN bank details on invoice",
              "EU-compliant invoice numbering",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <Link href="/generator">
            <Button size="lg" className="px-8">
              Create Your First Invoice — Free
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
