// POST /api/generate-pdf
// Accepts invoice data as JSON, returns a PDF binary stream.
// Runs server-side only — react-pdf cannot run in the browser.

import { NextRequest, NextResponse } from "next/server"
import { renderToBuffer, DocumentProps } from "@react-pdf/renderer"
import InvoicePDF from "@/components/invoice/InvoicePDF"
import { createElement, ReactElement } from "react"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.invoiceNumber || !data.fromName) {
      return NextResponse.json(
        { error: "Missing required fields: invoiceNumber, fromName" },
        { status: 400 }
      )
    }

    // Render the React PDF component to a binary buffer.
    // Cast needed because renderToBuffer expects DocumentProps at the root,
    // but InvoicePDF wraps <Document> internally — the cast is safe here.
    const pdfBuffer = await renderToBuffer(
      createElement(InvoicePDF, { data }) as ReactElement<DocumentProps>
    )

    // Convert Buffer to Uint8Array — required by NextResponse in Node 18+
    const pdfUint8 = new Uint8Array(pdfBuffer)

    // Return PDF as a downloadable file
    return new NextResponse(pdfUint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // Filename uses invoice number, e.g. INV-2026-001.pdf
        "Content-Disposition": `attachment; filename="${data.invoiceNumber}.pdf"`,
        "Content-Length": String(pdfUint8.length),
      },
    })
  } catch (error) {
    console.error("PDF generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    )
  }
}
