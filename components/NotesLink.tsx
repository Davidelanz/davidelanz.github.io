import Link from "next/link";
import { SectionHeading } from "./SectionHeading";

export function NotesLink() {
  return (
    <section className="section shell" id="notes">
      <SectionHeading number="05">notes</SectionHeading>
      <Link className="notes-link" href="/notes/">
        <div>
          <h2>Course notes &amp; cheatsheets</h2>
          <p>AI, robotics, control, signal processing, art and philosophy.</p>
        </div>
        <span>open index →</span>
      </Link>
    </section>
  );
}
