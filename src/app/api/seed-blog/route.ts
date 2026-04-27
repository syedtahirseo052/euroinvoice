// ONE-TIME seed route — visit /api/seed-blog?key=euroinvoice2026 to insert 3 blog posts
// After running, DELETE or disable this file.

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const posts = [
  {
    title: "How to Invoice as a Freelancer in Spain: NIF, IVA, and IRPF Explained",
    slug: "how-to-invoice-freelancer-spain-nif-iva-irpf",
    excerpt: "Everything a Spanish autónomo needs to know about invoicing: NIF format, correct IVA rates, IRPF withholding, and what happens if you get it wrong.",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    published: true,
    meta_title: "How to Invoice as a Freelancer in Spain — NIF, IVA, IRPF Guide",
    meta_description: "Complete guide to Spanish freelancer invoices: NIF format, IVA rates (21%), IRPF withholding (15%), and how to avoid the most common mistakes that get invoices rejected.",
    author_name: "EuroInvoice Team",
    author_bio: "EU invoicing experts helping freelancers get paid faster, with compliant invoices every time.",
    author_avatar: "",
    content: `INVOICING AS A SPANISH FREELANCER (AUTÓNOMO)

If you work as a freelancer in Spain, invoicing correctly is not optional — it's a legal requirement. Get it wrong and your invoice will be rejected by your client's accountant, or worse, flagged by the Agencia Tributaria.

Here is everything you need to know.

WHAT IS A NIF AND WHERE DOES IT GO?

Your NIF (Número de Identificación Fiscal) is your Spanish tax identification number. For most freelancers, this is the same as your DNI — your national ID number followed by a letter (e.g. 12345678Z).

Your NIF must appear on every invoice you issue. There is no exception. Without it, the invoice is not legally valid in Spain.

If you are invoicing a Spanish company, you also need their NIF on the invoice. For EU clients outside Spain, you need their VAT number instead.

IVA: WHAT RATE APPLIES TO YOUR SERVICES?

IVA (Impuesto sobre el Valor Añadido) is Spain's VAT. The standard rate is 21% and applies to most freelance services including web design, consulting, marketing, and software development.

Some services use reduced rates — 10% for certain health or education services. Very few freelancers will ever apply the 4% super-reduced rate.

Add IVA on top of your net fee. If you charge €1,000 for a project, your invoice should show €1,000 + €210 IVA = €1,210 total.

IRPF: THE WITHHOLDING TAX MOST FREELANCERS FORGET

IRPF (Impuesto sobre la Renta de las Personas Físicas) is Spain's income tax. When invoicing Spanish companies, you must apply a 15% withholding (7% in your first three years as autónomo).

This is not a deduction from your fee — it is a mechanism where your client withholds part of your payment and pays it directly to the Agencia Tributaria on your behalf.

Example for an established autónomo: €1,000 fee + €210 IVA (21%) − €150 IRPF (15%) = €1,060 that you actually receive.

Note: IRPF withholding does NOT apply when invoicing foreign clients outside Spain.

CROSS-BORDER EU INVOICES: REVERSE CHARGE

If you invoice a VAT-registered business in another EU country (say, a German GmbH), you do not add IVA. Instead, you apply what is called the reverse charge mechanism.

Your invoice should show €0 VAT and include the note: "Inversión del sujeto pasivo / Reverse charge — VAT 0% per EU Directive 2006/112/EC Art. 196."

The German company then self-accounts for VAT in their own country. This is perfectly normal and your invoice is 100% legal.

WHAT MUST EVERY SPANISH INVOICE INCLUDE?

By law, every invoice must contain:
— Your full name or business name and NIF
— Your client's full name or business name and NIF (or VAT number for EU)
— Invoice number (must be sequential — you cannot skip numbers)
— Invoice date
— Description of services
— Net amount, IVA amount and rate, IRPF amount and rate (if applicable)
— Total amount payable

COMMON MISTAKES THAT GET INVOICES REJECTED

Missing NIF — the most common error. Always include yours and your client's.
Wrong IVA rate — double-check which rate applies to your specific service.
Forgetting IRPF when invoicing Spanish companies.
Non-sequential invoice numbers — you will get a letter from Hacienda.
No description of services — "professional services" is not enough.

THE FASTEST WAY TO GET IT RIGHT

EuroInvoice automatically fills in the correct IVA rate for Spain, prompts you for your NIF, adds IRPF withholding when needed, and applies reverse charge for EU cross-border invoices.

You fill in your details and your client's — we handle the rest. Download a compliant PDF in under 60 seconds.`,
  },
  {
    title: "EU VAT for Freelancers: The Complete 2025 Guide to Reverse Charge",
    slug: "eu-vat-freelancers-reverse-charge-guide-2025",
    excerpt: "If you invoice clients in other EU countries, you need to understand reverse charge. This guide explains exactly how it works, when it applies, and what to write on your invoice.",
    image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    published: true,
    meta_title: "EU VAT Reverse Charge for Freelancers — Complete 2025 Guide",
    meta_description: "When do EU freelancers apply reverse charge? What VAT rate? What to write on the invoice? Complete guide with examples for Spain, Germany, France, Italy, Netherlands.",
    author_name: "EuroInvoice Team",
    author_bio: "EU invoicing experts helping freelancers get paid faster, with compliant invoices every time.",
    author_avatar: "",
    content: `EU VAT AND REVERSE CHARGE: WHAT EVERY FREELANCER MUST KNOW

If you work as a freelancer in the EU and you have clients in other EU countries, you will encounter the reverse charge mechanism. Get it wrong and your invoice is not VAT compliant — and you may end up owing VAT you did not collect.

This guide explains everything clearly.

WHAT IS REVERSE CHARGE?

Reverse charge is a VAT rule that shifts the responsibility for reporting and paying VAT from the seller (you) to the buyer (your client).

In a normal domestic transaction, you add VAT to your invoice, collect it from your client, and pay it to your country's tax authority. With reverse charge, you issue an invoice with 0% VAT, and your EU client self-accounts for the VAT in their own country.

This system was designed to simplify cross-border EU trade and prevent VAT fraud.

WHEN DOES REVERSE CHARGE APPLY?

The reverse charge mechanism applies when ALL of the following are true:

1. You are VAT-registered (or required to be) in your EU country
2. Your client is a VAT-registered business in a DIFFERENT EU country
3. The service falls under the general B2B supply rules (most freelance services do)

If you invoice a French company from Spain, and both parties are VAT registered, reverse charge applies. If you invoice a private individual in France (not a business), normal VAT rules apply instead.

WHAT TO WRITE ON YOUR INVOICE

When applying reverse charge, your invoice must include:
— Your VAT number (e.g. ES12345678Z for Spain)
— Your client's EU VAT number
— Net amount (your fee)
— VAT: €0.00 / 0%
— A legal note such as: "Reverse charge — VAT 0% per EU Directive 2006/112/EC Article 196"

Do not add any VAT. Do not write "VAT exempt." The specific reverse charge note is legally required.

EXAMPLES BY COUNTRY

Spanish freelancer invoicing German company:
Add your Spanish NIF/VAT, their German VAT number (DE...). Net fee + €0 VAT + reverse charge note. No IRPF either (IRPF only applies for Spanish clients).

German freelancer invoicing French company:
Add your German Steuernummer or USt-IdNr, their French SIRET/VAT number. Net fee + €0 VAT + reverse charge note.

French auto-entrepreneur invoicing Italian company:
Micro-entrepreneurs in France have special VAT rules — if you are under the franchise de TVA threshold, you do not charge TVA and write "TVA non applicable - article 293 B du CGI" instead. Check your status carefully.

WHAT ABOUT NON-EU CLIENTS?

If you invoice a company outside the EU (UK, USA, etc.), VAT generally does not apply. You issue an invoice with no VAT and no reverse charge note. Simply write "Outside EU — VAT not applicable."

DO I NEED TO DECLARE THESE INVOICES?

Yes. Even though you charge 0% VAT on reverse charge invoices, you must include them in your quarterly VAT return (Modelo 303 in Spain, UStVA in Germany, etc.) and in your EC Sales List (Modelo 349 in Spain, ZM in Germany).

Failing to declare these can result in penalties even if no VAT was due.

THE EASIEST WAY TO HANDLE REVERSE CHARGE

EuroInvoice detects when you are invoicing a client in a different EU country and automatically applies the reverse charge. The correct 0% VAT rate and the legally required wording appear on your PDF invoice automatically.

No mistakes. No missing declarations. Invoice downloaded in 60 seconds.`,
  },
  {
    title: "Freelancer Invoice Guide: Germany — Steuernummer, Umsatzsteuer, and Kleinunternehmer",
    slug: "freelancer-invoice-guide-germany-steuernummer-umsatzsteuer",
    excerpt: "German invoicing for freelancers is strict. Missing your Steuernummer or the wrong VAT note can get your invoice rejected. Here is the complete guide.",
    image_url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
    published: true,
    meta_title: "German Freelancer Invoice Guide — Steuernummer, USt, Kleinunternehmer",
    meta_description: "Complete guide to invoicing as a Freiberufler or Kleinunternehmer in Germany. Steuernummer vs USt-IdNr, 19% Umsatzsteuer, reverse charge, and all mandatory fields.",
    author_name: "EuroInvoice Team",
    author_bio: "EU invoicing experts helping freelancers get paid faster, with compliant invoices every time.",
    author_avatar: "",
    content: `INVOICING AS A FREELANCER IN GERMANY (FREIBERUFLER / KLEINUNTERNEHMER)

Germany has some of the most detailed invoice requirements in the EU. The Umsatzsteuergesetz (UStG) specifies exactly what every invoice must contain. Miss a field and your client cannot claim their VAT back — and they will send the invoice back to you.

Here is everything you need to know.

STEUERNUMMER VS UST-IDNR: WHICH DO YOU USE?

This is the most common point of confusion for German freelancers.

Your Steuernummer (e.g. 12/345/67890) is your local tax number assigned by your Finanzamt. Use this on invoices to domestic German clients.

Your USt-IdNr (Umsatzsteuer-Identifikationsnummer, e.g. DE123456789) is your EU VAT number. Use this on invoices to clients in other EU countries (for reverse charge transactions).

You can apply for your USt-IdNr at the Bundeszentralamt für Steuern (BZSt) once you are registered as self-employed.

UMSATZSTEUER: THE STANDARD VAT RATE

The standard Umsatzsteuer (USt) rate in Germany is 19%. The reduced rate is 7% and applies mainly to specific goods and services (books, food, certain cultural services).

Most freelance services — web development, consulting, design, writing, translation — are taxed at the full 19%.

You add 19% USt on top of your net fee. On your invoice, show the net amount (Nettobetrag), the USt amount (Umsatzsteuer 19%), and the gross total (Bruttobetrag).

KLEINUNTERNEHMER: THE SMALL BUSINESS EXCEPTION

If your annual turnover was below €22,000 in the previous year and is expected to stay below €50,000 in the current year, you can elect Kleinunternehmer status under § 19 UStG.

As a Kleinunternehmer, you do NOT charge USt on your invoices. Instead, you must include the following note (mandatory by law):

"Kein Umsatzsteuerausweis aufgrund der Kleinunternehmerregelung gem. § 19 UStG."

The advantage: simpler accounting, no quarterly VAT returns. The disadvantage: you cannot reclaim input VAT on business purchases.

MANDATORY FIELDS ON A GERMAN INVOICE

Under § 14 UStG, every German invoice must include:

1. Full name and address of the issuer (you)
2. Full name and address of the recipient (your client)
3. Your Steuernummer or USt-IdNr
4. Invoice number (must be unique and sequential)
5. Invoice date
6. Date of supply (Leistungsdatum) — often the same as invoice date
7. Description of services (Leistungsbeschreibung) — must be specific
8. Net amount (Nettobetrag)
9. Applicable USt rate and amount — or Kleinunternehmer note
10. Gross amount (Bruttobetrag)

For invoices over €250 gross, ALL of the above are mandatory. For invoices below €250 (Kleinbetragsrechnungen), some fields can be omitted.

CROSS-BORDER EU INVOICING FROM GERMANY

When invoicing a VAT-registered business in another EU country, reverse charge applies. You issue a 0% USt invoice with your USt-IdNr and your client's VAT number, and include:

"Steuerschuldnerschaft des Leistungsempfängers (Reverse Charge gemäß § 13b UStG / Art. 196 MwStSystRL)"

You must report these transactions in your Umsatzsteuervoranmeldung (UStVA) and your Zusammenfassende Meldung (ZM).

PAYMENT TERMS

Germany has strict laws around payment terms. By default, invoices are due within 30 days. If you want faster payment, clearly state your terms: "Zahlbar innerhalb von 14 Tagen ohne Abzug."

It is common to offer a Skonto (early payment discount) — for example 2% if paid within 10 days.

HOW EURINVOICE HANDLES GERMAN INVOICES

EuroInvoice automatically includes your Steuernummer field, applies the 19% USt rate, generates the legally required Kleinunternehmer note if you select that option, and handles reverse charge for EU clients.

All mandatory fields from § 14 UStG are included in the PDF. Download your compliant German invoice in under 60 seconds.`,
  },
]

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key")
  if (key !== "euroinvoice2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const results = []
  for (const post of posts) {
    const { error } = await supabaseAdmin
      .from("blog_posts")
      .upsert({ ...post }, { onConflict: "slug" })
    results.push({ slug: post.slug, ok: !error, error: error?.message })
  }

  return NextResponse.json({ message: "Done!", results })
}
