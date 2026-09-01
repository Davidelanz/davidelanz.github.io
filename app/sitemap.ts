import type { MetadataRoute } from "next";
import { posts } from "@/app/blog/posts";

export const dynamic = "force-static";

const origin = "https://dev.davidelanza.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ["", "/blog/", "/notes/"].map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${origin}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
