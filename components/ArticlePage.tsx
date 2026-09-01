import Link from "next/link";

type ArticlePageProps = {
  title: string;
  description: string;
  date: string;
  tags: readonly string[];
  children: React.ReactNode;
};

export function ArticlePage({ title, description, date, tags, children }: ArticlePageProps) {
  return (
    <main className="shell article-page">
      <Link className="back-link" href="/blog/">
        ← cd ../blog
      </Link>
      <header className="article-header">
        <div className="article-meta">
          <time>{date}</time>
          <span>{tags.map((tag) => `#${tag}`).join("  ")}</span>
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <article className="markdown">{children}</article>
    </main>
  );
}
