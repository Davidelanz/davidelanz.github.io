export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <span>© {new Date().getFullYear()} Davide Lanza</span>
        <span>Coded in Next.js · Deployed on GitHub</span>
      </div>
    </footer>
  );
}
