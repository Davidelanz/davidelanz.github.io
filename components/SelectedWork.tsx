import { projects } from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

export function SelectedWork() {
  return (
    <section className="section shell" id="works">
      <SectionHeading number="01">selected work</SectionHeading>
      <div className="item-list">
        {projects.map((project, index) => {
          const content = (
            <>
              <span className="item-row__index">0{index + 1}</span>
              <div>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
              </div>
              <span className="item-row__meta">{project.stack}</span>
              <span aria-hidden="true">{"href" in project ? "↗" : "—"}</span>
            </>
          );
          return "href" in project ? (
            <a className="item-row" href={project.href} key={project.name} target="_blank">
              {content}
            </a>
          ) : (
            <article className="item-row" key={project.name}>
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}
