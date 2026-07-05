import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier 01 — De l'idée au produit",
  description: "Coquille de départ de l'atelier Koality Academy",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
