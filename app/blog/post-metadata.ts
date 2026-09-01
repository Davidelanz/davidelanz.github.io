import type { Metadata } from "next";

type PostDetails = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

// Keep authored values in one place while deriving browser and sharing metadata.
export function definePostMetadata({ title, description, date, tags }: PostDetails): Metadata {
  return {
    title,
    description,
    other: { date, tags },
    openGraph: { title, description, type: "article", publishedTime: date },
    twitter: { card: "summary", title, description },
  };
}
