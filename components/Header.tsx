import Link from "next/link";

const navigation = [
  ["works", "/#works"],
  ["experience", "/#experience"],
  ["academia", "/#academia"],
  ["blog", "/#blog"],
  ["notes", "/notes/"],
] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="site-header__brand" href="/" aria-label="Davide Lanza [dev], home">
          dl<span>@dev</span>:~$
        </Link>
        <nav className="site-header__nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <Link href={href} key={label}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
