import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on software, data, machine learning and developer tools.",
};

export default function BlogPage() {
  return (
    <main className="shell listing-page">
      <div className="page-kicker">~/writing</div>
      <h1>
        Blog<span className="cursor">_</span>
      </h1>
      <p className="page-intro">
        Practical notes on software, data, machine learning, graphs and the tools around them.
      </p>
      <div className="blog-list">
        {posts.map((post) => (
          <Link className="blog-row" href={`/blog/${post.slug}/`} key={post.slug}>
            <time>{post.date}</time>
            <div>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <span>{post.tags.map((tag) => `#${tag}`).join("  ")}</span>
            </div>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </div>
    </main>
  );
}
