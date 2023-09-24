import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <div className="not_found__container">
        <h1 className="not_found__title">Error 404</h1>
        <h1 className="not_found__title">
          No se encontró la página que buscabas
        </h1>
        <Image
          src="/../favicon-128x128.png"
          alt="logo"
          width={128}
          height={128}
        />
        <div>
          <Link href="/">
            <h1 className="not_found__title">Volver al inicio</h1>
          </Link>
        </div>
      </div>
    </>
  );
}
