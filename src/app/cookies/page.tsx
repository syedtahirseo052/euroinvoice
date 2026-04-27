import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy — EuroInvoice",
  description: "EuroInvoice Cookie Policy. What cookies we use and why.",
}

export default function CookiesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container max-w-3xl mx-auto px-4 py-16">

        <div className="mb-10">
          <Link href="/" className="text-blue-600 text-sm hover:underline">← Back to EuroInvoice</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Cookie Policy</h1>
          <p className="text-sm text-gray-400">Last updated: April 2026</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and session state. EuroInvoice uses only the cookies strictly necessary for the Service to function.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies We Use</h2>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border font-semibold text-gray-700">Cookie</th>
                    <th className="text-left p-3 border font-semibold text-gray-700">Purpose</th>
                    <th className="text-left p-3 border font-semibold text-gray-700">Type</th>
                    <th className="text-left p-3 border font-semibold text-gray-700">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border font-mono text-xs">sb-auth-token</td>
                    <td className="p-3 border">Authentication session (Supabase)</td>
                    <td className="p-3 border"><span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Essential</span></td>
                    <td className="p-3 border">Session</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border font-mono text-xs">sb-refresh-token</td>
                    <td className="p-3 border">Keep you logged in between visits</td>
                    <td className="p-3 border"><span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Essential</span></td>
                    <td className="p-3 border">1 year</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-mono text-xs">stripe-session</td>
                    <td className="p-3 border">Stripe payment flow (Pro plan only)</td>
                    <td className="p-3 border"><span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Essential</span></td>
                    <td className="p-3 border">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">No Tracking Cookies</h2>
            <p>EuroInvoice does <strong>not</strong> use:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Advertising or retargeting cookies (Google Ads, Facebook Pixel)</li>
              <li>Third-party analytics cookies that track you across websites</li>
              <li>Social media tracking cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Managing Cookies</h2>
            <p>You can control cookies through your browser settings. Note that disabling essential cookies may prevent you from logging into your account. To manage cookies:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
              <li><strong>Firefox:</strong> Options → Privacy &amp; Security</li>
              <li><strong>Safari:</strong> Preferences → Privacy</li>
              <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
            <p>Cookie questions? Email <a href="mailto:support@euroinvoice.eu" className="text-blue-600 hover:underline">support@euroinvoice.eu</a></p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t flex gap-6 text-sm text-gray-400">
          <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <Link href="/imprint" className="hover:text-blue-600">Imprint</Link>
        </div>
      </div>
    </div>
  )
}
