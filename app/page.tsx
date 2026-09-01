import { Academia } from "@/components/Academia";
import { Experience } from "@/components/Experience";
import { Masthead } from "@/components/Masthead";
import { NotesLink } from "@/components/NotesLink";
import { SelectedWork } from "@/components/SelectedWork";
import { Writing } from "@/components/Writing";

export default function Home() {
  return (
    <main>
      <Masthead />
      <SelectedWork />
      <Experience />
      <Academia />
      <Writing />
      <NotesLink />
    </main>
  );
}
