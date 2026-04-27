import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Imprint / Impressum — EuroInvoice",
  description: "EuroInvoice legal imprint (Impressum) as required by EU law.",
}

export default function ImprintPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container max-w-3xl mx-auto px-4 py-16">

        <div className="mb-10">
          <Link href="/" className="text-blue-600 text-sm hover:underline">← Back to EuroInvoice</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Imprint / Impressum</h1>
          <p className="text-sm text-gray-400">Legal notice as required by EU/DE Telemediengesetz (TMG) § 5</p>
        </div>

        <div className="space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Service Provider</h2>
            <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1">
              <p className="font-semibold text-gray-900">EuroInvoice</p>
              <p>EU-based Software as a Service</p>
              <p className="mt-3">Email: <a href="mailto:support@euroinvoice.eu" className="text-blue-600 hover:underline">support@euroinvoice.eu</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Responsible for Content</h2>
            <p className="text-sm">Content responsibility pursuant to § 18 Abs. 2 MStV: EuroInvoice Team.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">EU Online Dispute Resolution</h2>
            <p className="text-sm">The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ec.europa.eu/consumers/odr</a></p>
            <p className="text-sm mt-2">We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board, but we are willing to resolve disputes by direct agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Disclaimer</h2>
            <p className="text-sm">EuroInvoice provides invoice templates as a tool to assist freelancers. The invoices generated are provided for informational purposes. You are responsible for ensuring your invoices comply with local tax laws. EuroInvoice accepts no liability for errors in generated invoices or tax calculations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Copyright</h2>
            <p className="text-sm">© {new Date().getFullYear()} EuroInvoice. All rights reserved. The content and design of this website are subject to copyright law. Reproduction requires written permission.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t flex gap-6 text-sm text-gray-400">
          <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <Link href="/cookies" className="hover:text-blue-600">Cookie Policy</Link>
        </div>
      </div>
    </div>
  )
}
