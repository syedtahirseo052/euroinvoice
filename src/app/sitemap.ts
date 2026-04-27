// Auto-generates sitemap.xml for all pages including SEO landing pages.
// Accessible at /sitemap.xml — submit this URL to Google Search Console.

import { MetadataRoute } from "next"
import seoPages from "@/data/seo-pages.json"

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://euroinvoice.eu"

export default function sitemap(): MetadataRoute.Sitemap {
  // Core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/generator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  // Programmatic SEO landing pages
  const seoLandingPages: MetadataRoute.Sitemap = (seoPages as Array<{
    locale: string
    slug: string
  }>).map((page) => ({
    url: `${BASE_URL}/${page.locale}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...seoLandingPages]
}
