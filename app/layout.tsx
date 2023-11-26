/* cspell:disable */
import type { Metadata } from "next";
import Footer from "./components/footer";
import "./globals.css";
import "./prism-material-dark.css";
import "./prism-line-numbers.css";
import NavBar from "./components/navbar";
import localFont from "next/font/local";

import { Montserrat } from "next/font/google";

import { getServerSession } from "next-auth";

import SessionProvider from "./components/SessionProvider";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="es" className={`${montserrat.variable} ${neutra.variable} `}>
      <meta charSet="utf-8" />

      <body>
        <SessionProvider session={session}>
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
          <div className="layout__wrapper">
            <div className="layout__container">
              <header className="">
                <NavBar></NavBar>
              </header>
              <main className="layout__main2">
                <div className="layout__main__fondo">{children}</div>
              </main>
              <Footer></Footer>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
