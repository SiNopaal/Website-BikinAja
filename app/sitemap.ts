import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://bikinaja.my.id/",
      lastModified: "2025-07-09T13:30:00Z",
      changeFrequency: "hourly", // sebelumnya "minutely"
      priority: 1,
    },
    {
      url: "https://bikinaja.my.id/#home",
      lastModified: "2025-07-09T13:30:00Z",
      changeFrequency: "hourly", // sebelumnya "minutely"
      priority: 1,
    },
    {
      url: "https://bikinaja.my.id/#services",
      lastModified: "2025-07-09T13:30:00Z",
      changeFrequency: "hourly", // sebelumnya "minutely"
      priority: 1,
    },
    {
      url: "https://bikinaja.my.id/#portofolio",
      lastModified: "2025-07-09T13:30:00Z",
      changeFrequency: "hourly", // sebelumnya "minutely"
      priority: 1,
    },
    {
      url: "https://bikinaja.my.id/#contact",
      lastModified: "2025-07-09T13:30:00Z",
      changeFrequency: "hourly", // sebelumnya "minutely"
      priority: 1,
    },
    {
      url: "https://bikinaja.my.id/#team",
      lastModified: "2025-07-09T13:30:00Z",
      changeFrequency: "hourly", // sebelumnya "minutely"
      priority: 1,
    },
  ];
}
