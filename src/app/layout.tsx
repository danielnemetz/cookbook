import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kochbuch",
  description: "Unsere Familienrezepte – digital durchsuchbar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border bg-card-bg sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🍳</span>
              <h1 className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                Kochbuch
              </h1>
            </Link>
            <nav className="text-sm text-muted">
              22 Rezepte
            </nav>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-border mt-12 py-6 text-center text-sm text-muted">
          Familienrezepte &middot; Mit Liebe digitalisiert
        </footer>
      </body>
    </html>
  );
}
