import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "@/styles/main.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://dev.davidelanza.it"),
  title: { default: "Davide Lanza - Software & Robotics Engineer", template: "%s — Davide Lanza" },
  description:
    "Development portfolio presenting selected works and academia contributions, along with work experience and technical blog posts.",
  openGraph: {
    title: "Davide Lanza — Software & Robotics Engineer",
    description: "Software, robotics, and notes from the field.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
