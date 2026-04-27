// PDF invoice template — @react-pdf/renderer (server-side only)
// 2026 Modern Design: dark header, accent stripe, clean table, premium totals

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
  fromName: string
  fromAddress: string
  fromCity: string
  fromCountry: string
  fromTaxId: string
  fromEmail: string
  fromIban: string
  toName: string
  toAddress: string
  toCity: string
  toCountry: string
  toVatId: string
  invoiceNumber: string
  issuedDate: string
  dueDate: string
  currency: string
  language: string
  notes: string
  lineItems: LineItem[]
}

// ─── Design Tokens ──────────────────────────────────────────────────────────

const C = {
  navy:    "#0F172A",   // header background
  slate800:"#1E293B",  // table header
  slate700:"#334155",  // dark text
  blue:    "#3B82F6",  // accent — stripe, highlights
  blue50:  "#EFF6FF",  // reverse charge bg
  blue100: "#DBEAFE",  // reverse charge border
  slate50: "#F8FAFC",  // page bg tint / alt row
  slate100:"#F1F5F9",  // info boxes
  slate200:"#E2E8F0",  // borders
  slate400:"#94A3B8",  // secondary text
  slate500:"#64748B",  // body text
  white:   "#FFFFFF",
  dark:    "#0F172A",
  amber50: "#FFFBEB",
  amber200:"#FDE68A",
  amber800:"#92400E",
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.dark,
    backgroundColor: C.white,
    paddingBottom: 56,
  },

  // ── Header block ──
  header: {
    backgroundColor: C.navy,
    paddingHorizontal: 44,
    paddingTop: 30,
    paddingBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flexDirection: "column",
  },
  companyName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 4,
  },
  companyEmail: {
    fontSize: 8.5,
    color: C.slate400,
    marginBottom: 2,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  invoiceWord: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    letterSpacing: 2,
    marginBottom: 8,
  },
  invoiceNumber: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.slate400,
    marginBottom: 3,
  },
  invoiceDateRow: {
    fontSize: 8,
    color: C.slate400,
    marginBottom: 2,
    textAlign: "right",
  },

  // ── Blue accent stripe ──
  accentStripe: {
    height: 4,
    backgroundColor: C.blue,
  },

  // ── Main body padding ──
  body: {
    paddingHorizontal: 44,
    paddingTop: 28,
  },

  // ── Status badge row ──
  statusRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 22,
  },
  statusBadge: {
    backgroundColor: C.blue,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusBadgeText: {
    color: C.white,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },

  // ── Parties ──
  partiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  partyCard: {
    width: "46%",
    backgroundColor: C.slate100,
    borderRadius: 6,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: C.blue,
  },
  partyCardRight: {
    borderLeftColor: C.slate200,
  },
  partyLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.blue,
    letterSpacing: 1.2,
    marginBottom: 7,
  },
  partyLabelRight: {
    color: C.slate400,
  },
  partyName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    marginBottom: 4,
  },
  partyDetail: {
    color: C.slate500,
    fontSize: 8.5,
    lineHeight: 1.65,
  },
  partyTaxId: {
    color: C.slate700,
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    marginTop: 3,
  },

  // ── Divider ──
  divider: {
    height: 1,
    backgroundColor: C.slate200,
    marginBottom: 18,
  },

  // ── Table ──
  table: {
    marginBottom: 4,
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: C.slate800,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 0,
  },
  thText: {
    color: C.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    letterSpacing: 0.4,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.slate200,
  },
  tableRowAlt: {
    backgroundColor: C.slate50,
  },
  tdText: {
    fontSize: 8.5,
    color: C.slate700,
  },
  tdBold: {
    fontFamily: "Helvetica-Bold",
    color: C.navy,
  },

  // Column widths
  colDesc:  { width: "40%" },
  colQty:   { width: "10%", textAlign: "right" },
  colPrice: { width: "17%", textAlign: "right" },
  colVat:   { width: "13%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },

  // ── Totals ──
  totalsWrapper: {
    alignItems: "flex-end",
    marginTop: 12,
    marginBottom: 22,
  },
  totalsBox: {
    width: 230,
    borderWidth: 1,
    borderColor: C.slate200,
    borderRadius: 6,
    overflow: "hidden",
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: C.slate200,
  },
  totalsRowLabel: {
    fontSize: 8.5,
    color: C.slate500,
  },
  totalsRowValue: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
  },
  totalsFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: C.navy,
  },
  totalsFinalLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    letterSpacing: 0.5,
  },
  totalsFinalValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: C.white,
  },

  // ── Info boxes row ──
  infoRow: {
    flexDirection: "row",
    marginTop: 0,
    marginBottom: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: C.slate100,
    borderRadius: 6,
    padding: 12,
    marginRight: 10,
  },
  infoBoxLast: {
    marginRight: 0,
  },
  infoBoxLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.slate400,
    letterSpacing: 1,
    marginBottom: 5,
  },
  infoBoxValue: {
    fontSize: 8.5,
    color: C.slate700,
    lineHeight: 1.6,
  },

  // ── Reverse charge ──
  rcBox: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: C.blue100,
    backgroundColor: C.blue50,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
  },
  rcDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.blue,
    marginTop: 2,
    marginRight: 8,
  },
  rcText: {
    fontSize: 8,
    color: C.slate700,
    flex: 1,
    lineHeight: 1.6,
  },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerStripe: {
    height: 4,
    backgroundColor: C.blue,
  },
  footerBar: {
    backgroundColor: C.navy,
    paddingHorizontal: 44,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 7.5,
    color: C.slate400,
  },
  footerBrand: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.slate400,
  },
  pageNum: {
    fontSize: 7.5,
    color: C.slate400,
  },
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

function money(amount: number, cur: string) {
  return `${cur} ${amount.toFixed(2)}`
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function InvoicePDF({ data }: { data: InvoiceData }) {
  const labels      = getLabels(data.language)
  const fromCountry = getCountryByCode(data.fromCountry)

  const isReverseCharge =
    !!data.toVatId && !!data.toCountry && data.toCountry !== data.fromCountry

  const subtotal = data.lineItems.reduce((s, i) => s + i.qty * i.unitPrice, 0)
  const vatAmount = isReverseCharge
    ? 0
    : data.lineItems.reduce((s, i) => s + i.qty * i.unitPrice * (i.vatRate / 100), 0)
  const total = subtotal + vatAmount

  return (
    <Document>
      <Page size="A4" style={S.page}>

        {/* ── Dark Header ── */}
        <View style={S.header}>
          <View style={S.headerLeft}>
            <Text style={S.companyName}>{data.fromName}</Text>
            {data.fromEmail ? <Text style={S.companyEmail}>{data.fromEmail}</Text> : null}
            {data.fromAddress ? <Text style={S.companyEmail}>{data.fromAddress}</Text> : null}
            {data.fromCity ? <Text style={S.companyEmail}>{data.fromCity}</Text> : null}
          </View>
          <View style={S.headerRight}>
            <Text style={S.invoiceWord}>{labels.invoice}</Text>
            <Text style={S.invoiceNumber}>{data.invoiceNumber}</Text>
            <Text style={S.invoiceDateRow}>{labels.issuedDate}: {data.issuedDate}</Text>
            <Text style={S.invoiceDateRow}>{labels.dueDate}: {data.dueDate}</Text>
          </View>
        </View>

        {/* ── Blue accent stripe ── */}
        <View style={S.accentStripe} />

        {/* ── Body ── */}
        <View style={S.body}>

          {/* Status badge */}
          <View style={S.statusRow}>
            <View style={S.statusBadge}>
              <Text style={S.statusBadgeText}>AWAITING PAYMENT</Text>
            </View>
          </View>

          {/* ── Parties ── */}
          <View style={S.partiesRow}>

            {/* Seller */}
            <View style={S.partyCard}>
              <Text style={S.partyLabel}>FROM</Text>
              <Text style={S.partyName}>{data.fromName}</Text>
              {data.fromAddress ? <Text style={S.partyDetail}>{data.fromAddress}</Text> : null}
              {data.fromCity    ? <Text style={S.partyDetail}>{data.fromCity}</Text>    : null}
              {data.fromTaxId   ? (
                <Text style={S.partyTaxId}>
                  {fromCountry?.taxIdLabel ?? labels.taxId}: {data.fromTaxId}
                </Text>
              ) : null}
            </View>

            {/* Client */}
            <View style={[S.partyCard, S.partyCardRight]}>
              <Text style={[S.partyLabel, S.partyLabelRight]}>{labels.billTo.toUpperCase()}</Text>
              <Text style={S.partyName}>{data.toName}</Text>
              {data.toAddress ? <Text style={S.partyDetail}>{data.toAddress}</Text> : null}
              {data.toCity    ? <Text style={S.partyDetail}>{data.toCity}</Text>    : null}
              {data.toVatId   ? (
                <Text style={S.partyTaxId}>VAT: {data.toVatId}</Text>
              ) : null}
            </View>
          </View>

          {/* ── Table ── */}
          <View style={S.table}>
            {/* Head */}
            <View style={S.tableHead}>
              <Text style={[S.thText, S.colDesc]}>{labels.description.toUpperCase()}</Text>
              <Text style={[S.thText, S.colQty]}>{labels.qty.toUpperCase()}</Text>
              <Text style={[S.thText, S.colPrice]}>{labels.unitPrice.toUpperCase()}</Text>
              <Text style={[S.thText, S.colVat]}>{labels.vat.toUpperCase()}</Text>
              <Text style={[S.thText, S.colTotal]}>{labels.total.toUpperCase()}</Text>
            </View>

            {/* Rows */}
            {data.lineItems.map((item, idx) => {
              const lineTotal = item.qty * item.unitPrice * (1 + (isReverseCharge ? 0 : item.vatRate) / 100)
              return (
                <View key={item.id} style={[S.tableRow, idx % 2 === 1 ? S.tableRowAlt : {}]}>
                  <Text style={[S.tdText, S.tdBold, S.colDesc]}>{item.description}</Text>
                  <Text style={[S.tdText, S.colQty]}>{item.qty}</Text>
                  <Text style={[S.tdText, S.colPrice]}>{item.unitPrice.toFixed(2)}</Text>
                  <Text style={[S.tdText, S.colVat]}>
                    {isReverseCharge ? "0%" : `${item.vatRate}%`}
                  </Text>
                  <Text style={[S.tdText, S.tdBold, S.colTotal]}>
                    {money(lineTotal, data.currency)}
                  </Text>
                </View>
              )
            })}
          </View>

          {/* ── Totals ── */}
          <View style={S.totalsWrapper}>
            <View style={S.totalsBox}>
              <View style={S.totalsRow}>
                <Text style={S.totalsRowLabel}>{labels.subtotal}</Text>
                <Text style={S.totalsRowValue}>{money(subtotal, data.currency)}</Text>
              </View>
              <View style={S.totalsRow}>
                <Text style={S.totalsRowLabel}>
                  {isReverseCharge ? "VAT (Reverse Charge)" : labels.vatAmount}
                </Text>
                <Text style={S.totalsRowValue}>{money(vatAmount, data.currency)}</Text>
              </View>
              <View style={S.totalsFinal}>
                <Text style={S.totalsFinalLabel}>{labels.totalAmount.toUpperCase()}</Text>
                <Text style={S.totalsFinalValue}>{money(total, data.currency)}</Text>
              </View>
            </View>
          </View>

          {/* ── Info boxes ── */}
          {(data.fromIban || data.notes) && (
            <View style={S.infoRow}>
              {data.fromIban ? (
                <View style={[S.infoBox, !data.notes ? S.infoBoxLast : {}]}>
                  <Text style={S.infoBoxLabel}>{labels.bankTransfer.toUpperCase()}</Text>
                  <Text style={S.infoBoxValue}>{data.fromIban}</Text>
                </View>
              ) : null}
              {data.notes ? (
                <View style={[S.infoBox, S.infoBoxLast]}>
                  <Text style={S.infoBoxLabel}>{labels.notes.toUpperCase()}</Text>
                  <Text style={S.infoBoxValue}>{data.notes}</Text>
                </View>
              ) : null}
            </View>
          )}

          {/* ── Reverse charge notice ── */}
          {isReverseCharge && (
            <View style={S.rcBox}>
              <View style={S.rcDot} />
              <Text style={S.rcText}>{labels.reverseCharge}</Text>
            </View>
          )}

        </View>

        {/* ── Footer (fixed at bottom) ── */}
        <View style={S.footer} fixed>
          <View style={S.footerStripe} />
          <View style={S.footerBar}>
            <Text style={S.footerBrand}>EuroInvoice</Text>
            <Text
              style={S.pageNum}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
            />
          </View>
        </View>

      </Page>
    </Document>
  )
}
