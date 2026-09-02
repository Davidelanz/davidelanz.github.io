import type { Metadata } from "next";
import { NotesIndex } from "@/components/NotesIndex";
import { TerminalTitle } from "@/components/TerminalTitle";

export const metadata: Metadata = {
  title: "Notes",
  description: "Course notes and technical cheatsheets collected by Davide Lanza.",
};

export default function NotesPage() {
  return (
    <main className="shell notes-page">
      <p className="page-kicker">~/notes</p>
      <h1>
        <TerminalTitle text="Notes" />
      </h1>
      <p className="page-intro">
        Course notes, drafts and cheatsheets. Authorship is stated where the material is not mine.
      </p>
      <NotesIndex />
    </main>
  );
}
