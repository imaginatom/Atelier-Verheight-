import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atelier-verheight.fr"),
  title: "Atelier Verheight — Pierre & béton, pièces uniques",
  description:
    "Atelier de taille de pierre et de béton près de Lyon. Pièces monolithiques sur commande pour architectes, depuis 1986.",
  openGraph: {
    title: "Atelier Verheight — Pierre & béton, pièces uniques",
    description:
      "Atelier de taille de pierre et de béton près de Lyon. Pièces monolithiques sur commande pour architectes, depuis 1986.",
    url: "/",
    siteName: "Atelier Verheight",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0E0D0B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {/* Critical fonts — hero display + body. JSX links land at the top of
            <head>, ahead of script preloads; the LCP headline repaints on font
            swap, so these must win the first round-trips. */}
        <link
          rel="preload"
          href="/fonts/soehne-breit-buch.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/suisse-intl-regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>
  );
}
