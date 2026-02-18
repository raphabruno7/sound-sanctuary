import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sound-sanctuary.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/` },
    { url: `${BASE_URL}/sound-healing` },
    { url: `${BASE_URL}/sessions` },
    { url: `${BASE_URL}/contact` },
    { url: `${BASE_URL}/about` },
    { url: `${BASE_URL}/portfolio` },
    { url: `${BASE_URL}/newsletter` },
    { url: `${BASE_URL}/privacy` },
  ];
}

