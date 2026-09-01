import { education, experience } from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

function Timeline({ items }: { items: typeof experience }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article className="timeline__row" key={item.role}>
          <time>{item.period}</time>
          <div>
            <h2>{item.role}</h2>
            <p>{item.org}</p>
          </div>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

export function Experience() {
  return (
    <section className="section shell" id="experience">
      <SectionHeading number="02">experience</SectionHeading>
      <Timeline items={experience} />
      <details className="studies">
        <summary>
          <span className="studies__closed">+ show studies</span>
          <span className="studies__open">− hide studies</span>
        </summary>
        <Timeline items={education} />
      </details>
    </section>
  );
}
