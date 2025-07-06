import type { Metadata } from "next";
import "./globals.css";
import "./prism-material-dark.css";
import "./prism-line-numbers.css";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import SessionProvider from "./components/SessionProvider";
import ClientLayout from "./components/clientLayout";

const neutra = localFont({
  src: "../public/fonts/neutratextbook.otf",
  variable: "--font-neutra",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "BRILLOTOPÍA CROMADISTÓPICA",
  description: "are-bure-boke-blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${neutra.variable} `}>
      <meta charSet="utf-8" />
      <body>
        <SessionProvider>
          <svg className="grainy_background" width="100%" height="100%">
            <filter id="grano">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grano)"></rect>
          </svg>
          <ClientLayout>{children}</ClientLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
