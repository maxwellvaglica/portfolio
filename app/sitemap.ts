import type { MetadataRoute } from "next";
import { WEBSITE_URL } from "@/lib/constants";
import { PROJECTS } from "./data";
import companies from "./for/companies.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${WEBSITE_URL}/`, lastModified: now, priority: 1.0 },
    { url: `${WEBSITE_URL}/opportunities`, lastModified: now, priority: 0.9 },
    { url: `${WEBSITE_URL}/tabguard`, lastModified: now, priority: 0.7 },
    {
      url: `${WEBSITE_URL}/tabguard/support`,
      lastModified: now,
      priority: 0.4,
    },
    {
      url: `${WEBSITE_URL}/tabguard/privacy`,
      lastModified: now,
      priority: 0.4,
    },
    { url: `${WEBSITE_URL}/photoscan`, lastModified: now, priority: 0.7 },
    {
      url: `${WEBSITE_URL}/photoscan/support`,
      lastModified: now,
      priority: 0.4,
    },
    {
      url: `${WEBSITE_URL}/photoscan/privacy`,
      lastModified: now,
      priority: 0.4,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${WEBSITE_URL}/projects/${p.id}`,
    lastModified: now,
    priority: 0.7,
  }));

  const companyRoutes: MetadataRoute.Sitemap = (
    companies as { slug: string }[]
  ).map((c) => ({
    url: `${WEBSITE_URL}/for/${c.slug}`,
    lastModified: now,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...companyRoutes];
}
