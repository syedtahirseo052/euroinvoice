import type { Metadata } from "next"
import "./globals.css"
import ConditionalLayout from "@/components/ConditionalLayout"

export const metadata: Metadata = {
  title: "EuroInvoice — Free Invoice Generator for EU Freelancers",
  description:
    "Create professional invoices with country-specific EU tax fields. Free PDF download. Supports Spain, Germany, France, Italy, Netherlands, Poland, Ireland and more.",
  keywords: "invoice generator, EU freelancer, VAT invoice, factura, Rechnung, freelance invoice",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
