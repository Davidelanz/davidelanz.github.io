import type { Metadata } from "next";
import { noteGroups } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Course notes and technical cheatsheets collected by Davide Lanza.",
};

export default function NotesPage() {
  return (
    <main className="shell notes-page">
      <p className="page-kicker">~/notes</p>
      <h1>
        Notes<span className="cursor">_</span>
      </h1>
      <p className="page-intro">
        Course notes, drafts and cheatsheets. Authorship is stated where the material is not mine.
      </p>
      {noteGroups.map((group) => (
        <section className="notes-group" key={group.title}>
          <h2>{group.title}</h2>
          <div>
            {group.items.map((note) => (
              <a href={`/notes/${note.file}`} key={note.file}>
                <span>{note.title}</span>
                <small>{note.detail}</small>
                <b>PDF ↓</b>
              </a>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
