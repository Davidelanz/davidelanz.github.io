import Link from "next/link";
import { posts } from "@/app/blog/posts";
import { SectionHeading } from "./SectionHeading";

export function Writing() {
  return (
    <section className="section shell" id="blog">
      <SectionHeading number="04">blog</SectionHeading>
      <div className="writing-list">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}/`} key={post.slug}>
            <time>{post.date}</time>
            <h2>{post.title}</h2>
            <span>→</span>
          </Link>
        ))}
      </div>
      <Link className="text-link" href="/blog/">
        all writing →
      </Link>
    </section>
  );
}
