import Link from "next/link";
import { Suspense } from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<p>Cargando post...</p>}>{children}</Suspense>
      <div className="volver">
        <Link href="/">⬅ Volver</Link>
      </div>
    </>
  );
}
