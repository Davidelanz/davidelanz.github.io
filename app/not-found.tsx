import Link from "next/link";
export default function NotFound() {
  return (
    <main className="shell not-found">
      <p>error: route_not_found</p>
      <h1>
        404<span>_</span>
      </h1>
      <Link href="/">← return home</Link>
    </main>
  );
}
