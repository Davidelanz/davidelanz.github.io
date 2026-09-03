"use client";

import { useEffect, useRef } from "react";
import { education, experience } from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

function Timeline({ items }: { items: typeof experience }) {
  return (
    <div className="timeline">
      {items.map((item, index) => {
        const continuesAtSameOrg = items[index + 1]?.org === item.org;
        const classNames = [
          "timeline__row",
          item.previousAtSameOrg && "timeline__row--previous",
          continuesAtSameOrg && "timeline__row--continues",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <article className={classNames} key={item.role}>
            <time>{item.period}</time>
            <div>
              <h2>{item.role}</h2>
              <p>{item.previousAtSameOrg ? "Previous role" : item.org}</p>
            </div>
            <p>{item.detail}</p>
          </article>
        );
      })}
    </div>
  );
}

export function Experience() {
  const studiesRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    let wasOpen: boolean | null = null;

    const openStudies = () => {
      if (!studiesRef.current) return;
      if (wasOpen === null) wasOpen = studiesRef.current.open;
      studiesRef.current.open = true;
    };

    const restoreStudies = () => {
      if (studiesRef.current && wasOpen !== null) studiesRef.current.open = wasOpen;
      wasOpen = null;
    };

    const printMedia = window.matchMedia("print");
    const handlePrintMedia = (event: MediaQueryListEvent) => {
      if (event.matches) openStudies();
      else restoreStudies();
    };

    window.addEventListener("beforeprint", openStudies);
    window.addEventListener("afterprint", restoreStudies);
    printMedia.addEventListener("change", handlePrintMedia);

    return () => {
      window.removeEventListener("beforeprint", openStudies);
      window.removeEventListener("afterprint", restoreStudies);
      printMedia.removeEventListener("change", handlePrintMedia);
    };
  }, []);

  return (
    <section className="section shell" id="experience">
      <SectionHeading number="02">experience</SectionHeading>
      <Timeline items={experience} />
      <details className="studies" ref={studiesRef}>
        <summary>
          <span className="studies__closed">+ show studies</span>
          <span className="studies__open">− studies</span>
        </summary>
        <Timeline items={education} />
      </details>
    </section>
  );
}
