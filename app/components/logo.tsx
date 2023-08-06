import logo from "./logo.module.css";
import Link from "next/link";
import { metadata } from "../layout";
import Image
 from "next/image";
export default function Logo() {
  return (
    <>
      <div className={logo.logo__container}>
        <div className={logo.logo__titulo}>
          <Link href="/">
            <>BRILLOTOPÍA CROMADISTÓPICA</>
          </Link>
        </div>
        <div className={logo.logo__descripcion__container}>
          <div className={logo.logo__descripcion}>
            <Image
              src="/favicon-128x128.png"
              alt="mi gata rosita"
              height={64}
              width={64}
            ></Image>
            <div>are-bure-boke-blog</div>
          </div>
        </div>
      </div>
    </>
  );
}
