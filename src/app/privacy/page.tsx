import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — EuroInvoice",
  description: "EuroInvoice Privacy Policy. GDPR-compliant. How we collect, use, and protect your personal data.",
}

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container max-w-3xl mx-auto px-4 py-16">

        <div className="mb-10">
          <Link href="/" className="text-blue-600 text-sm hover:underline">← Back to EuroInvoice</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: April 2026 · GDPR compliant</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-10">
          <p className="text-blue-800 text-sm font-medium">
            🇪🇺 This Privacy Policy complies with the EU General Data Protection Regulation (GDPR) (EU) 2016/679.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Data Controller</h2>
            <p>EuroInvoice is the data controller for personal data processed through this Service. For data protection enquiries, contact us at: <a href="mailto:support@euroinvoice.eu" className="text-blue-600 hover:underline">support@euroinvoice.eu</a></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Data We Collect</h2>
            <p>We collect the following categories of data:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Account data:</strong> Email address and password (hashed) when you create an account.</li>
              <li><strong>Invoice data:</strong> Business name, tax ID, address, client details, and invoice line items that you enter into the generator. This data is stored only if you are logged in; anonymous sessions are not stored server-side.</li>
              <li><strong>Payment data:</strong> Pro plan billing is handled entirely by Stripe. We do not store credit card numbers. Stripe&apos;s privacy policy applies to payment processing.</li>
              <li><strong>Technical data:</strong> IP address, browser type, and usage analytics (via privacy-respecting analytics) to improve the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Legal Basis for Processing</h2>
            <p>We process your personal data on the following legal bases under GDPR Article 6:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Contract performance (Art. 6(1)(b)):</strong> To provide the invoice generation service you requested.</li>
              <li><strong>Legitimate interests (Art. 6(1)(f)):</strong> To secure the Service, prevent fraud, and improve functionality.</li>
              <li><strong>Consent (Art. 6(1)(a)):</strong> For optional cookies and marketing communications.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. How We Use Your Data</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>To provide and maintain your account and invoices</li>
              <li>To process Pro plan subscriptions</li>
              <li>To respond to support enquiries</li>
              <li>To send transactional emails (password resets, subscription confirmations)</li>
              <li>To improve the Service through aggregated, anonymised analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Sharing</h2>
            <p>We do not sell your personal data. We share data only with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Supabase</strong> — cloud database and authentication provider (EU data centres available)</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Netlify</strong> — hosting and deployment</li>
            </ul>
            <p className="mt-3">All processors are contractually bound by GDPR-compliant data processing agreements.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Retention</h2>
            <p>We retain your data for as long as your account is active. If you delete your account, all personal data is permanently deleted within 30 days, except where retention is required by law (e.g. tax records).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights Under GDPR</h2>
            <p>As an EU data subject, you have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Access</strong> — request a copy of your personal data</li>
              <li><strong>Rectification</strong> — correct inaccurate data</li>
              <li><strong>Erasure</strong> — request deletion of your data (&quot;right to be forgotten&quot;)</li>
              <li><strong>Restriction</strong> — restrict processing of your data</li>
              <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
              <li><strong>Object</strong> — object to processing based on legitimate interests</li>
              <li><strong>Withdraw consent</strong> — at any time for consent-based processing</li>
            </ul>
            <p className="mt-3">To exercise any right, email <a href="mailto:support@euroinvoice.eu" className="text-blue-600 hover:underline">support@euroinvoice.eu</a>. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Cookies</h2>
            <p>We use essential cookies for authentication and session management. For details, see our <Link href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Security</h2>
            <p>We implement industry-standard security measures including HTTPS encryption, hashed passwords, and access controls. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Complaints</h2>
            <p>You have the right to lodge a complaint with your national data protection authority. In Germany, this is the Bundesdatenschutzbeauftragter (BfDI). In Spain, the Agencia Española de Protección de Datos (AEPD).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Changes to This Policy</h2>
            <p>We may update this policy to reflect changes in law or our practices. Material changes will be communicated to registered users by email.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t flex gap-6 text-sm text-gray-400">
          <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-blue-600">Cookie Policy</Link>
          <Link href="/imprint" className="hover:text-blue-600">Imprint</Link>
        </div>
      </div>
    </div>
  )
}
