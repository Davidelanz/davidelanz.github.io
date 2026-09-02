import { TerminalTitle } from "./TerminalTitle";

export function Masthead() {
  return (
    <section className="masthead shell">
      <p className="masthead__prompt">davide@portfolio:~$ whoami</p>
      <h1>
        <TerminalTitle text="Davide Lanza" />
      </h1>
      <p className="masthead__role">Software &amp; Robotics Engineer</p>
      <p className="masthead__intro">
        Full-stack software, intelligent systems, scientific computing.
      </p>
      <div className="masthead__links">
        <a target="_blank" href="https://github.com/Davidelanz">
          github ↗
        </a>
        <a target="_blank" href="https://scholar.google.com/citations?user=Lqx6VqEAAAAJ">
          scholar ↗
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/lanzadavide">
          linkedin ↗
        </a>
      </div>
    </section>
  );
}
