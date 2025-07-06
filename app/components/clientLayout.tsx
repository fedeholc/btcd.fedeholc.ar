"use client";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import NavBar from "./navbar";
import Footer from "./footer";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { data: session } = useSession();

  return (
    <div className="layout__wrapper">
      <div className="layout__container">
        <header className="">
          <NavBar />
        </header>
        <main className="layout__main2">
          <div className="layout__main__fondo">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
