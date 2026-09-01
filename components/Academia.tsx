import { publications } from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

export function Academia() {
  return (
    <section className="section shell" id="academia">
      <SectionHeading number="03">academia</SectionHeading>
      <ol className="publication-list">
        {publications.map((paper) => (
          <li key={paper.title}>
            <a href={paper.href} target="_blank">
              <h2>{paper.title} ↗</h2>
            </a>
            <p>{paper.authors}</p>
            <p>{paper.venue}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
