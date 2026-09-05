import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const base =
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://krishp091205.github.io/my-portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}