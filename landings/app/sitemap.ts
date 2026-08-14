import type { MetadataRoute } from "next";
import { solutions } from "../lib/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://quantsetters.com";
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/soluciones`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/implementar`, changeFrequency: "monthly", priority: 0.8 },
    ...solutions.map((solution) => ({
      url: `${baseUrl}/soluciones/${solution.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85
    }))
  ];
}
