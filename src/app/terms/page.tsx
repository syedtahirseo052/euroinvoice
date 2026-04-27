import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service — EuroInvoice",
  description: "EuroInvoice Terms of Service. Read our terms before using our EU freelancer invoice generator.",
}

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container max-w-3xl mx-auto px-4 py-16">

        <div className="mb-10">
          <Link href="/" className="text-blue-600 text-sm hover:underline">← Back to EuroInvoice</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-400">Last updated: April 2026</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using EuroInvoice (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service. EuroInvoice is operated as a software-as-a-service tool designed to help EU freelancers generate VAT-compliant invoices.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p>EuroInvoice provides an online invoice generator that helps freelancers in the European Union create PDF invoices with correct VAT calculations, country-specific tax ID fields, and reverse-charge handling. The Service is provided &quot;as is&quot; and we make no guarantees that the output will satisfy every jurisdiction-specific requirement, as tax laws change frequently.</p>
            <p className="mt-3">You are solely responsible for verifying that invoices you generate comply with local tax law. We strongly recommend consulting a qualified accountant or tax advisor in your country.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Free and Pro Plans</h2>
            <p>EuroInvoice offers a free tier and a paid Pro plan (€19/month). The free tier allows unlimited invoice generation and PDF downloads. The Pro plan provides additional features including invoice history, client management, and priority support.</p>
            <p className="mt-3">Pro subscriptions are billed monthly and may be cancelled at any time. No refunds are provided for partial months. Payment is processed via Stripe.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. User Accounts</h2>
            <p>You may use the invoice generator without creating an account. If you create an account, you are responsible for maintaining the security of your credentials. You must provide accurate information and you may not use someone else&apos;s account.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Acceptable Use</h2>
            <p>You agree not to use EuroInvoice to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Generate fraudulent, false, or misleading invoices</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to reverse-engineer or scrape the Service</li>
              <li>Use the Service in any way that could damage, disable, or impair it</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Intellectual Property</h2>
            <p>All content, design, and software of EuroInvoice is owned by EuroInvoice and protected by copyright. You retain full ownership of the invoice data you enter and the PDF invoices you generate.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p>EuroInvoice is provided without warranty of any kind. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service, including errors in VAT calculations or invoice rejections.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Governing Law</h2>
            <p>These Terms are governed by EU law. Any disputes shall be resolved in accordance with the laws of the European Union and applicable member state regulations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to Terms</h2>
            <p>We reserve the right to update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms. We will notify registered users of material changes by email.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact</h2>
            <p>Questions about these Terms? Contact us at <a href="mailto:support@euroinvoice.eu" className="text-blue-600 hover:underline">support@euroinvoice.eu</a></p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t flex gap-6 text-sm text-gray-400">
          <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <Link href="/cookies" className="hover:text-blue-600">Cookie Policy</Link>
          <Link href="/imprint" className="hover:text-blue-600">Imprint</Link>
        </div>
      </div>
    </div>
  )
}
