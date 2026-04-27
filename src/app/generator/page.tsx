"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EU_COUNTRIES, getCountryByCode } from "@/lib/countries"
import { Plus, Trash2, ChevronRight, ChevronLeft, Download, Loader2 } from "lucide-react"

// Types for form state
interface LineItem {
  id: string
  description: string
  qty: number
  unitPrice: number
  vatRate: number
}

interface InvoiceForm {
  // Step 1 — Your info
  fromName: string
  fromAddress: string
  fromCity: string
  fromCountry: string
  fromTaxId: string
  fromEmail: string
  fromIban: string
  // Step 2 — Client info
  toName: string
  toAddress: string
  toCity: string
  toCountry: string
  toVatId: string
  // Step 3 — Invoice details
  invoiceNumber: string
  issuedDate: string
  dueDate: string
  currency: string
  language: string
  notes: string
  // Step 4 — Line items
  lineItems: LineItem[]
}

function generateInvoiceNumber() {
  const now = new Date()
  return `INV-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}${String(Math.floor(Math.random() * 900) + 100)}`
}

function today() {
  return new Date().toISOString().split("T")[0]
}

function dueIn30() {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().split("T")[0]
}

const STEP_LABELS = ["Your Info", "Client Info", "Invoice Details", "Line Items", "Preview"]

export default function GeneratorPage() {
  const [step, setStep] = useState(0)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [pdfError, setPdfError] = useState("")

  // Calls the server-side API route to generate and download the PDF
  async function handleDownloadPdf() {
    setIsGeneratingPdf(true)
    setPdfError("")
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error("PDF generation failed")

      // Convert response to blob and trigger browser download
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${form.invoiceNumber}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setPdfError("Could not generate PDF. Please try again.")
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const [form, setForm] = useState<InvoiceForm>({
    fromName: "",
    fromAddress: "",
    fromCity: "",
    fromCountry: "ES",
    fromTaxId: "",
    fromEmail: "",
    fromIban: "",
    toName: "",
    toAddress: "",
    toCity: "",
    toCountry: "",
    toVatId: "",
    invoiceNumber: generateInvoiceNumber(),
    issuedDate: today(),
    dueDate: dueIn30(),
    currency: "EUR",
    language: "en",
    notes: "",
    lineItems: [{ id: "1", description: "", qty: 1, unitPrice: 0, vatRate: 21 }],
  })

  const fromCountry = getCountryByCode(form.fromCountry)

  function update(field: keyof InvoiceForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function updateLineItem(id: string, field: keyof LineItem, value: string | number) {
    setForm((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }))
  }

  function addLineItem() {
    setForm((prev) => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        { id: String(Date.now()), description: "", qty: 1, unitPrice: 0, vatRate: fromCountry?.defaultVat ?? 21 },
      ],
    }))
  }

  function removeLineItem(id: string) {
    setForm((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((item) => item.id !== id),
    }))
  }

  // Totals calculation
  const subtotal = form.lineItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  const vatAmount = form.lineItems.reduce(
    (sum, item) => sum + item.qty * item.unitPrice * (item.vatRate / 100),
    0
  )
  const total = subtotal + vatAmount

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Generator</h1>
      <p className="text-gray-500 mb-8">Free · No account required · Download as PDF</p>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                i === step
                  ? "bg-blue-600 text-white"
                  : i < step
                  ? "bg-blue-100 text-blue-700 cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              {label}
            </button>
            {i < STEP_LABELS.length - 1 && (
              <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">

          {/* ── STEP 0: Your Info ── */}
          {step === 0 && (
            <div className="space-y-5">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Your Information</CardTitle>
              </CardHeader>

              {/* Country selector — drives tax ID label */}
              <div className="space-y-2">
                <Label>Your Country</Label>
                <Select value={form.fromCountry} onValueChange={(v) => update("fromCountry", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {EU_COUNTRIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name / Business Name</Label>
                  <Input
                    value={form.fromName}
                    onChange={(e) => update("fromName", e.target.value)}
                    placeholder="John Smith / Acme SL"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={form.fromEmail}
                    onChange={(e) => update("fromEmail", e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={form.fromAddress}
                  onChange={(e) => update("fromAddress", e.target.value)}
                  placeholder="Calle Gran Vía 1, 28013 Madrid"
                />
              </div>

              {/* Tax ID label changes based on country */}
              <div className="space-y-2">
                <Label>{fromCountry?.taxIdLabel ?? "Tax ID"}</Label>
                <Input
                  value={form.fromTaxId}
                  onChange={(e) => update("fromTaxId", e.target.value)}
                  placeholder={fromCountry?.taxIdPlaceholder ?? ""}
                />
              </div>

              <div className="space-y-2">
                <Label>IBAN (for bank transfer payment)</Label>
                <Input
                  value={form.fromIban}
                  onChange={(e) => update("fromIban", e.target.value)}
                  placeholder="ES91 2100 0418 4502 0005 1332"
                />
              </div>
            </div>
          )}

          {/* ── STEP 1: Client Info ── */}
          {step === 1 && (
            <div className="space-y-5">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Client Information</CardTitle>
              </CardHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client Name / Company</Label>
                  <Input
                    value={form.toName}
                    onChange={(e) => update("toName", e.target.value)}
                    placeholder="Client Company GmbH"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Client Country</Label>
                  <Select value={form.toCountry} onValueChange={(v) => update("toCountry", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {EU_COUNTRIES.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.flag} {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Client Address</Label>
                <Input
                  value={form.toAddress}
                  onChange={(e) => update("toAddress", e.target.value)}
                  placeholder="Musterstraße 1, 10115 Berlin"
                />
              </div>

              <div className="space-y-2">
                <Label>Client VAT ID (optional — for B2B reverse charge)</Label>
                <Input
                  value={form.toVatId}
                  onChange={(e) => update("toVatId", e.target.value)}
                  placeholder="DE123456789"
                />
              </div>

              {/* Reverse charge warning */}
              {form.toVatId && form.toCountry && form.toCountry !== form.fromCountry && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
                  ⚠️ Cross-border EU B2B sale detected. Reverse charge VAT rules may apply — VAT will be shown as 0% on the invoice.
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Invoice Details ── */}
          {step === 2 && (
            <div className="space-y-5">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Invoice Number</Label>
                  <Input
                    value={form.invoiceNumber}
                    onChange={(e) => update("invoiceNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={form.currency} onValueChange={(v) => update("currency", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR — Euro</SelectItem>
                      <SelectItem value="PLN">PLN — Polish Złoty</SelectItem>
                      <SelectItem value="GBP">GBP — British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input
                    type="date"
                    value={form.issuedDate}
                    onChange={(e) => update("issuedDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => update("dueDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Invoice Language</Label>
                <Select value={form.language} onValueChange={(v) => update("language", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                    <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                    <SelectItem value="de">🇩🇪 German</SelectItem>
                    <SelectItem value="fr">🇫🇷 French</SelectItem>
                    <SelectItem value="it">🇮🇹 Italian</SelectItem>
                    <SelectItem value="nl">🇳🇱 Dutch</SelectItem>
                    <SelectItem value="pl">🇵🇱 Polish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes (optional)</Label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Payment terms, bank details note, thank you message..."
                />
              </div>
            </div>
          )}

          {/* ── STEP 3: Line Items ── */}
          {step === 3 && (
            <div className="space-y-5">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Line Items</CardTitle>
              </CardHeader>

              <div className="space-y-3">
                {/* Header row */}
                <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide px-1">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">VAT %</div>
                  <div className="col-span-1"></div>
                </div>

                {form.lineItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-12 sm:col-span-5">
                      <Input
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                        placeholder="Service description"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <Input
                        type="number"
                        min="0"
                        step="0.5"
                        value={item.qty}
                        onChange={(e) => updateLineItem(item.id, "qty", parseFloat(e.target.value) || 0)}
                        placeholder="Qty"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateLineItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                        placeholder="Price"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <Select
                        value={String(item.vatRate)}
                        onValueChange={(v) => updateLineItem(item.id, "vatRate", parseFloat(v))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(fromCountry?.vatRates ?? [0, 10, 21]).map((rate) => (
                            <SelectItem key={rate} value={String(rate)}>
                              {rate}%
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => removeLineItem(item.id)}
                        disabled={form.lineItems.length === 1}
                        className="text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" onClick={addLineItem} className="gap-2">
                <Plus className="h-4 w-4" /> Add Line Item
              </Button>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{form.currency} {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT</span>
                  <span>{form.currency} {vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-2">
                  <span>Total</span>
                  <span>{form.currency} {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Preview ── */}
          {step === 4 && (
            <div className="space-y-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Invoice Preview</CardTitle>
              </CardHeader>

              {/* Simple invoice preview */}
              <div className="border rounded-lg p-6 bg-white space-y-6 text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg text-gray-900">{form.fromName || "Your Name"}</p>
                    <p className="text-gray-500">{form.fromAddress}</p>
                    <p className="text-gray-500">{form.fromEmail}</p>
                    {form.fromTaxId && (
                      <p className="text-gray-500">{fromCountry?.taxIdLabel}: {form.fromTaxId}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-blue-600">INVOICE</p>
                    <p className="text-gray-700 font-medium">{form.invoiceNumber}</p>
                    <p className="text-gray-500">Issued: {form.issuedDate}</p>
                    <p className="text-gray-500">Due: {form.dueDate}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Bill To</p>
                  <p className="font-medium text-gray-800">{form.toName || "Client Name"}</p>
                  <p className="text-gray-500">{form.toAddress}</p>
                  {form.toVatId && <p className="text-gray-500">VAT: {form.toVatId}</p>}
                </div>

                <table className="w-full text-left border-t">
                  <thead>
                    <tr className="border-b text-xs text-gray-400 uppercase">
                      <th className="py-2">Description</th>
                      <th className="py-2 text-right">Qty</th>
                      <th className="py-2 text-right">Price</th>
                      <th className="py-2 text-right">VAT</th>
                      <th className="py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.lineItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">{item.description || "—"}</td>
                        <td className="py-2 text-right">{item.qty}</td>
                        <td className="py-2 text-right">{item.unitPrice.toFixed(2)}</td>
                        <td className="py-2 text-right">{item.vatRate}%</td>
                        <td className="py-2 text-right font-medium">
                          {(item.qty * item.unitPrice * (1 + item.vatRate / 100)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-right space-y-1">
                  <p className="text-gray-500">Subtotal: {form.currency} {subtotal.toFixed(2)}</p>
                  <p className="text-gray-500">VAT: {form.currency} {vatAmount.toFixed(2)}</p>
                  <p className="font-bold text-lg">Total: {form.currency} {total.toFixed(2)}</p>
                </div>

                {form.fromIban && (
                  <div className="border-t pt-3 text-xs text-gray-500">
                    <span className="font-medium">Bank transfer:</span> {form.fromIban}
                  </div>
                )}

                {form.notes && (
                  <div className="border-t pt-3 text-xs text-gray-500">
                    <span className="font-medium">Notes:</span> {form.notes}
                  </div>
                )}
              </div>

              {/* PDF download */}
              <div className="flex flex-col items-center gap-3">
                <Button
                  size="lg"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="gap-2 bg-green-600 hover:bg-green-700 px-8"
                >
                  {isGeneratingPdf ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Generating PDF...</>
                  ) : (
                    <><Download className="h-4 w-4" /> Download PDF</>
                  )}
                </Button>
                {pdfError && (
                  <p className="text-red-500 text-sm">{pdfError}</p>
                )}
                <p className="text-xs text-gray-400">
                  Free PDF · No account required
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>

            {step < STEP_LABELS.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)} className="gap-2">
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                {isGeneratingPdf ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <><Download className="h-4 w-4" /> Download PDF</>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
