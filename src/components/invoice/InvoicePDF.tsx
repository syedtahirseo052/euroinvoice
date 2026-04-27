// PDF invoice template rendered by @react-pdf/renderer.
// This runs server-side in the API route — NOT in the browser.
// Styles use react-pdf's StyleSheet, not Tailwind.

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer"
import { getLabels } from "@/lib/invoice-translations"
import { getCountryByCode } from "@/lib/countries"

// ─── Types ──────────────────────────────────────────────────────────────────

export interface LineItem {
  id: string
  description: string
  qty: number
  unitPrice: number
  vatRate: number
}

export interface InvoiceData {
  // Seller
  fromName: string
  fromAddress: string
  fromCity: string
  fromCountry: string
  fromTaxId: string
  fromEmail: string
  fromIban: string
  // Client
  toName: string
  toAddress: string
  toCity: string
  toCountry: string
  toVatId: string
  // Invoice meta
  invoiceNumber: string
  issuedDate: string
  dueDate: string
  currency: string
  language: string
  notes: string
  // Items
  lineItems: LineItem[]
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const blue = "#2563EB"
const gray = "#6B7280"
const dark = "#111827"
const lightGray = "#F3F4F6"
const borderColor = "#E5E7EB"

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: dark,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 48,
    backgroundColor: "#FFFFFF",
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  brandName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: blue,
  },
  invoiceTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: blue,
    textAlign: "right",
  },
  invoiceMeta: {
    textAlign: "right",
    color: gray,
    marginTop: 4,
    lineHeight: 1.6,
  },
  // Parties
  partiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: borderColor,
  },
  partyBox: {
    width: "46%",
  },
  partyLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: gray,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  partyName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: dark,
    marginBottom: 3,
  },
  partyDetail: {
    color: gray,
    lineHeight: 1.6,
  },
  // Table
  table: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: blue,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  tableHeaderText: {
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  tableRowAlt: {
    backgroundColor: lightGray,
  },
  colDesc: { width: "42%" },
  colQty: { width: "10%", textAlign: "right" },
  colPrice: { width: "16%", textAlign: "right" },
  colVat: { width: "12%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },
  // Totals
  totalsSection: {
    alignItems: "flex-end",
    marginTop: 8,
    marginBottom: 24,
  },
  totalsBox: {
    width: 220,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  totalsLabel: { color: gray },
  totalsValue: { fontFamily: "Helvetica-Bold" },
  totalsFinalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    backgroundColor: blue,
    paddingHorizontal: 8,
    borderRadius: 2,
    marginTop: 2,
  },
  totalsFinalLabel: {
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  totalsFinalValue: {
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  // Footer info boxes
  infoRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  infoBox: {
    flex: 1,
    backgroundColor: lightGray,
    borderRadius: 4,
    padding: 10,
  },
  infoBoxLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: gray,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  infoBoxValue: {
    color: dark,
    lineHeight: 1.6,
  },
  // Reverse charge notice
  reverseChargeBox: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#FCD34D",
    backgroundColor: "#FFFBEB",
    borderRadius: 4,
    padding: 8,
  },
  reverseChargeText: {
    fontSize: 8,
    color: "#92400E",
  },
  // Page number
  pageNumber: {
    position: "absolute",
    bottom: 24,
    right: 48,
    fontSize: 8,
    color: gray,
  },
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatMoney(amount: number, currency: string) {
  return `${currency} ${amount.toFixed(2)}`
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function InvoicePDF({ data }: { data: InvoiceData }) {
  const labels = getLabels(data.language)
  const fromCountry = getCountryByCode(data.fromCountry)

  // Detect cross-border B2B reverse charge
  const isReverseCharge =
    !!data.toVatId &&
    !!data.toCountry &&
    data.toCountry !== data.fromCountry

  // Totals
  const subtotal = data.lineItems.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  )
  const vatAmount = isReverseCharge
    ? 0
    : data.lineItems.reduce(
        (sum, item) => sum + item.qty * item.unitPrice * (item.vatRate / 100),
        0
      )
  const total = subtotal + vatAmount

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>{data.fromName}</Text>
            <Text style={{ color: gray, marginTop: 4 }}>{data.fromEmail}</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>{labels.invoice}</Text>
            <Text style={styles.invoiceMeta}>
              {labels.invoiceNumber}: {data.invoiceNumber}{"\n"}
              {labels.issuedDate}: {data.issuedDate}{"\n"}
              {labels.dueDate}: {data.dueDate}
            </Text>
          </View>
        </View>

        {/* ── Parties ── */}
        <View style={styles.partiesRow}>
          {/* Seller */}
          <View style={styles.partyBox}>
            <Text style={styles.partyLabel}>From</Text>
            <Text style={styles.partyName}>{data.fromName}</Text>
            <Text style={styles.partyDetail}>{data.fromAddress}</Text>
            <Text style={styles.partyDetail}>{data.fromCity}</Text>
            {data.fromTaxId ? (
              <Text style={styles.partyDetail}>
                {fromCountry?.taxIdLabel ?? labels.taxId}: {data.fromTaxId}
              </Text>
            ) : null}
            {data.fromEmail ? (
              <Text style={styles.partyDetail}>{data.fromEmail}</Text>
            ) : null}
          </View>

          {/* Client */}
          <View style={styles.partyBox}>
            <Text style={styles.partyLabel}>{labels.billTo}</Text>
            <Text style={styles.partyName}>{data.toName}</Text>
            <Text style={styles.partyDetail}>{data.toAddress}</Text>
            <Text style={styles.partyDetail}>{data.toCity}</Text>
            {data.toVatId ? (
              <Text style={styles.partyDetail}>VAT: {data.toVatId}</Text>
            ) : null}
          </View>
        </View>

        {/* ── Line Items Table ── */}
        <View style={styles.table}>
          {/* Table header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDesc]}>{labels.description}</Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>{labels.qty}</Text>
            <Text style={[styles.tableHeaderText, styles.colPrice]}>{labels.unitPrice}</Text>
            <Text style={[styles.tableHeaderText, styles.colVat]}>{labels.vat}</Text>
            <Text style={[styles.tableHeaderText, styles.colTotal]}>{labels.total}</Text>
          </View>

          {/* Rows */}
          {data.lineItems.map((item, index) => {
            const lineTotal = item.qty * item.unitPrice * (1 + (isReverseCharge ? 0 : item.vatRate) / 100)
            return (
              <View
                key={item.id}
                style={[styles.tableRow, index % 2 === 1 ? styles.tableRowAlt : {}]}
              >
                <Text style={styles.colDesc}>{item.description}</Text>
                <Text style={styles.colQty}>{item.qty}</Text>
                <Text style={styles.colPrice}>{item.unitPrice.toFixed(2)}</Text>
                <Text style={styles.colVat}>{isReverseCharge ? "0%" : `${item.vatRate}%`}</Text>
                <Text style={styles.colTotal}>{formatMoney(lineTotal, data.currency)}</Text>
              </View>
            )
          })}
        </View>

        {/* ── Totals ── */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsBox}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>{labels.subtotal}</Text>
              <Text style={styles.totalsValue}>{formatMoney(subtotal, data.currency)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>{labels.vatAmount}</Text>
              <Text style={styles.totalsValue}>{formatMoney(vatAmount, data.currency)}</Text>
            </View>
            <View style={styles.totalsFinalRow}>
              <Text style={styles.totalsFinalLabel}>{labels.totalAmount}</Text>
              <Text style={styles.totalsFinalValue}>{formatMoney(total, data.currency)}</Text>
            </View>
          </View>
        </View>

        {/* ── Footer info (IBAN + notes) ── */}
        <View style={styles.infoRow}>
          {data.fromIban ? (
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxLabel}>{labels.bankTransfer}</Text>
              <Text style={styles.infoBoxValue}>{data.fromIban}</Text>
            </View>
          ) : null}
          {data.notes ? (
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxLabel}>{labels.notes}</Text>
              <Text style={styles.infoBoxValue}>{data.notes}</Text>
            </View>
          ) : null}
        </View>

        {/* ── Reverse charge notice ── */}
        {isReverseCharge && (
          <View style={styles.reverseChargeBox}>
            <Text style={styles.reverseChargeText}>{labels.reverseCharge}</Text>
          </View>
        )}

        {/* ── Page number ── */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />

      </Page>
    </Document>
  )
}
