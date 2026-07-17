import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const base = "https://abubakar.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
  ];
  for (const p of projects) {
    routes.push({
      url: `${base}/projects/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  return routes;
}
