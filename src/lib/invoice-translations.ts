// Invoice field labels translated into 7 EU languages.
// These are printed on the PDF so clients see text in their language.

export type Lang = "en" | "es" | "de" | "fr" | "it" | "nl" | "pl"

export interface InvoiceLabels {
  invoice: string
  invoiceNumber: string
  issuedDate: string
  dueDate: string
  billTo: string
  description: string
  qty: string
  unitPrice: string
  vat: string
  total: string
  subtotal: string
  vatAmount: string
  totalAmount: string
  bankTransfer: string
  notes: string
  taxId: string
  reverseCharge: string
}

export const TRANSLATIONS: Record<Lang, InvoiceLabels> = {
  en: {
    invoice: "INVOICE",
    invoiceNumber: "Invoice No.",
    issuedDate: "Issue Date",
    dueDate: "Due Date",
    billTo: "Bill To",
    description: "Description",
    qty: "Qty",
    unitPrice: "Unit Price",
    vat: "VAT",
    total: "Total",
    subtotal: "Subtotal",
    vatAmount: "VAT Amount",
    totalAmount: "Total Due",
    bankTransfer: "Bank Transfer",
    notes: "Notes",
    taxId: "Tax ID",
    reverseCharge: "VAT reverse charge — Art. 196 EU VAT Directive",
  },
  es: {
    invoice: "FACTURA",
    invoiceNumber: "Nº Factura",
    issuedDate: "Fecha de Emisión",
    dueDate: "Fecha de Vencimiento",
    billTo: "Facturar a",
    description: "Descripción",
    qty: "Cant.",
    unitPrice: "Precio Unit.",
    vat: "IVA",
    total: "Total",
    subtotal: "Base Imponible",
    vatAmount: "Cuota IVA",
    totalAmount: "Total a Pagar",
    bankTransfer: "Transferencia Bancaria",
    notes: "Notas",
    taxId: "NIF / CIF",
    reverseCharge: "Inversión del sujeto pasivo — Art. 196 Directiva IVA UE",
  },
  de: {
    invoice: "RECHNUNG",
    invoiceNumber: "Rechnungsnr.",
    issuedDate: "Rechnungsdatum",
    dueDate: "Fälligkeitsdatum",
    billTo: "Rechnungsempfänger",
    description: "Beschreibung",
    qty: "Menge",
    unitPrice: "Einzelpreis",
    vat: "MwSt.",
    total: "Gesamt",
    subtotal: "Nettobetrag",
    vatAmount: "MwSt.-Betrag",
    totalAmount: "Gesamtbetrag",
    bankTransfer: "Banküberweisung",
    notes: "Anmerkungen",
    taxId: "Steuernummer",
    reverseCharge: "Steuerschuldnerschaft des Leistungsempfängers — § 13b UStG",
  },
  fr: {
    invoice: "FACTURE",
    invoiceNumber: "N° Facture",
    issuedDate: "Date d'émission",
    dueDate: "Date d'échéance",
    billTo: "Facturer à",
    description: "Description",
    qty: "Qté",
    unitPrice: "Prix unitaire",
    vat: "TVA",
    total: "Total",
    subtotal: "Montant HT",
    vatAmount: "Montant TVA",
    totalAmount: "Total TTC",
    bankTransfer: "Virement bancaire",
    notes: "Notes",
    taxId: "SIRET / SIREN",
    reverseCharge: "Autoliquidation de la TVA — Art. 196 Directive TVA UE",
  },
  it: {
    invoice: "FATTURA",
    invoiceNumber: "N° Fattura",
    issuedDate: "Data di Emissione",
    dueDate: "Data di Scadenza",
    billTo: "Intestata a",
    description: "Descrizione",
    qty: "Q.tà",
    unitPrice: "Prezzo Unit.",
    vat: "IVA",
    total: "Totale",
    subtotal: "Imponibile",
    vatAmount: "IVA",
    totalAmount: "Totale da Pagare",
    bankTransfer: "Bonifico Bancario",
    notes: "Note",
    taxId: "Partita IVA",
    reverseCharge: "Inversione contabile — Art. 196 Direttiva IVA UE",
  },
  nl: {
    invoice: "FACTUUR",
    invoiceNumber: "Factuurnr.",
    issuedDate: "Factuurdatum",
    dueDate: "Vervaldatum",
    billTo: "Factuur aan",
    description: "Omschrijving",
    qty: "Aantal",
    unitPrice: "Stukprijs",
    vat: "BTW",
    total: "Totaal",
    subtotal: "Subtotaal",
    vatAmount: "BTW-bedrag",
    totalAmount: "Te betalen",
    bankTransfer: "Bankoverschrijving",
    notes: "Opmerkingen",
    taxId: "BTW-nummer",
    reverseCharge: "BTW verlegd — Art. 196 EU BTW-richtlijn",
  },
  pl: {
    invoice: "FAKTURA VAT",
    invoiceNumber: "Nr faktury",
    issuedDate: "Data wystawienia",
    dueDate: "Termin płatności",
    billTo: "Nabywca",
    description: "Nazwa towaru/usługi",
    qty: "Ilość",
    unitPrice: "Cena jedn.",
    vat: "VAT",
    total: "Wartość brutto",
    subtotal: "Wartość netto",
    vatAmount: "Kwota VAT",
    totalAmount: "Do zapłaty",
    bankTransfer: "Przelew bankowy",
    notes: "Uwagi",
    taxId: "NIP",
    reverseCharge: "Odwrotne obciążenie VAT — Art. 196 Dyrektywa VAT UE",
  },
}

export function getLabels(lang: string): InvoiceLabels {
  return TRANSLATIONS[(lang as Lang) ?? "en"] ?? TRANSLATIONS.en
}
