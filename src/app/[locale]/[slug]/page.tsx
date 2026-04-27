// Programmatic SEO template — one file renders all 2,700+ landing pages.
// Next.js generates these as static pages at build time via generateStaticParams.

import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import seoPages from "@/data/seo-pages.json"

// ─── Types ───────────────────────────────────────────────────────────────────

interface SeoPage {
  locale: string
  slug: string
  lang: string
  country: string
  keyword: string
  monthlySearches: number
  title: string
  metaDescription: string
  h1: string
  intro: string
  faqs: { q: string; a: string }[]
}

// ─── Static Params — tells Next.js which pages to pre-build ─────────────────

export async function generateStaticParams() {
  return (seoPages as SeoPage[]).map((page) => ({
    locale: page.locale,
    slug: page.slug,
  }))
}

// ─── Metadata — unique title + description per page for SEO ─────────────────

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const page = (seoPages as SeoPage[]).find(
    (p) => p.locale === params.locale && p.slug === params.slug
  )
  if (!page) return {}

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `/${page.locale}/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: "website",
    },
  }
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function SeoLandingPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const page = (seoPages as SeoPage[]).find(
    (p) => p.locale === params.locale && p.slug === params.slug
  )

  if (!page) notFound()

  // Generator URL pre-seeded with the page's country
  const generatorUrl = `/generator?country=${page.country}&lang=${page.lang}`

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">

      {/* ── Breadcrumb ── */}
      <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blue-600">EuroInvoice</Link>
        {" › "}
        <span className="text-gray-600">{page.keyword}</span>
      </nav>

      {/* ── H1 — exact match keyword ── */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {page.h1}
      </h1>

      {/* ── 200-word intro ── */}
      <div className="prose prose-gray max-w-none mb-10">
        <p className="text-lg text-gray-600 leading-relaxed">{page.intro}</p>
      </div>

      {/* ── Quick feature checklist ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 bg-blue-50 rounded-xl p-6">
        {[
          page.lang === "es" ? "NIF / CIF incluido automáticamente" :
          page.lang === "de" ? "Steuernummer automatisch vorausgefüllt" :
          page.lang === "fr" ? "SIRET inclus automatiquement" :
          page.lang === "it" ? "Partita IVA inclusa automaticamente" :
          page.lang === "nl" ? "BTW-nummer automatisch ingevuld" :
          page.lang === "pl" ? "NIP uzupełniany automatycznie" :
          "VAT number auto-filled",

          page.lang === "es" ? "Tipos de IVA correctos para España" :
          page.lang === "de" ? "Korrekte MwSt.-Sätze für Deutschland" :
          page.lang === "fr" ? "Taux de TVA corrects pour la France" :
          page.lang === "it" ? "Aliquote IVA corrette per l'Italia" :
          page.lang === "nl" ? "Juiste BTW-tarieven voor Nederland" :
          page.lang === "pl" ? "Prawidłowe stawki VAT dla Polski" :
          "Correct VAT rates for Ireland",

          page.lang === "es" ? "Descarga en PDF gratis" :
          page.lang === "de" ? "Kostenloser PDF-Download" :
          page.lang === "fr" ? "Téléchargement PDF gratuit" :
          page.lang === "it" ? "Download PDF gratuito" :
          page.lang === "nl" ? "Gratis PDF downloaden" :
          page.lang === "pl" ? "Darmowy pobieranie PDF" :
          "Free PDF download",

          page.lang === "es" ? "Sin registro necesario" :
          page.lang === "de" ? "Keine Anmeldung erforderlich" :
          page.lang === "fr" ? "Sans inscription requise" :
          page.lang === "it" ? "Senza registrazione" :
          page.lang === "nl" ? "Geen registratie nodig" :
          page.lang === "pl" ? "Bez rejestracji" :
          "No account required",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
            <span className="text-sm font-medium text-gray-700">{item}</span>
          </div>
        ))}
      </div>

      {/* ── Embedded generator CTA ── */}
      <div className="border-2 border-blue-200 rounded-2xl p-8 bg-white text-center mb-12 shadow-sm">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
          {page.lang === "es" ? "Generador gratuito" :
           page.lang === "de" ? "Kostenloser Generator" :
           page.lang === "fr" ? "Générateur gratuit" :
           page.lang === "it" ? "Generatore gratuito" :
           page.lang === "nl" ? "Gratis generator" :
           page.lang === "pl" ? "Darmowy generator" :
           "Free generator"}
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {page.lang === "es" ? "Crea tu factura ahora — gratis" :
           page.lang === "de" ? "Jetzt Rechnung erstellen — kostenlos" :
           page.lang === "fr" ? "Créez votre facture maintenant — gratuitement" :
           page.lang === "it" ? "Crea la tua fattura ora — gratis" :
           page.lang === "nl" ? "Maak nu je factuur — gratis" :
           page.lang === "pl" ? "Utwórz fakturę teraz — za darmo" :
           "Create your invoice now — free"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {page.lang === "es" ? "Rellena los datos, descarga el PDF. Sin registro, sin tarjeta de crédito." :
           page.lang === "de" ? "Daten eingeben, PDF herunterladen. Keine Anmeldung, keine Kreditkarte." :
           page.lang === "fr" ? "Remplissez vos données, téléchargez le PDF. Sans inscription, sans carte bancaire." :
           page.lang === "it" ? "Inserisci i dati, scarica il PDF. Senza registrazione, senza carta di credito." :
           page.lang === "nl" ? "Vul je gegevens in, download de PDF. Geen registratie, geen creditcard." :
           page.lang === "pl" ? "Wypełnij dane, pobierz PDF. Bez rejestracji, bez karty kredytowej." :
           "Fill in your details, download the PDF. No registration, no credit card."}
        </p>
        <Link href={generatorUrl}>
          <Button size="lg" className="gap-2 px-8 py-6 text-lg">
            {page.lang === "es" ? "Crear factura gratis" :
             page.lang === "de" ? "Rechnung kostenlos erstellen" :
             page.lang === "fr" ? "Créer une facture gratuite" :
             page.lang === "it" ? "Crea fattura gratis" :
             page.lang === "nl" ? "Gratis factuur maken" :
             page.lang === "pl" ? "Utwórz fakturę za darmo" :
             "Create free invoice"}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* ── FAQ section ── */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {page.lang === "es" ? "Preguntas frecuentes" :
           page.lang === "de" ? "Häufig gestellte Fragen" :
           page.lang === "fr" ? "Questions fréquentes" :
           page.lang === "it" ? "Domande frequenti" :
           page.lang === "nl" ? "Veelgestelde vragen" :
           page.lang === "pl" ? "Najczęstsze pytania" :
           "Frequently asked questions"}
        </h2>

        {/* JSON-LD FAQ schema — helps Google show rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: page.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            }),
          }}
        />

        <div className="space-y-6">
          {page.faqs.map((faq, i) => (
            <div key={i} className="border-b pb-5">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <div className="mt-12 text-center bg-gray-50 rounded-xl p-8">
        <p className="text-gray-500 text-sm mb-4">
          {page.lang === "es" ? "¿Listo para crear tu factura?" :
           page.lang === "de" ? "Bereit, Ihre Rechnung zu erstellen?" :
           page.lang === "fr" ? "Prêt à créer votre facture ?" :
           page.lang === "it" ? "Pronto a creare la tua fattura?" :
           page.lang === "nl" ? "Klaar om je factuur te maken?" :
           page.lang === "pl" ? "Gotowy do stworzenia faktury?" :
           "Ready to create your invoice?"}
        </p>
        <Link href={generatorUrl}>
          <Button variant="outline" className="gap-2">
            {page.lang === "es" ? "Ir al generador →" :
             page.lang === "de" ? "Zum Generator →" :
             page.lang === "fr" ? "Aller au générateur →" :
             page.lang === "it" ? "Vai al generatore →" :
             page.lang === "nl" ? "Naar de generator →" :
             page.lang === "pl" ? "Przejdź do generatora →" :
             "Go to generator →"}
          </Button>
        </Link>
      </div>
    </article>
  )
}
