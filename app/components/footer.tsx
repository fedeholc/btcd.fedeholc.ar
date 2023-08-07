import Foot from "./footer.module.css";
import { MdEmail, MdPhotoLibrary } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className={Foot.container}>
      <div className={Foot.text}>
        <div className={Foot.nombre}>FEDERICO HOLC</div>
        <div className={Foot.emoji}>|</div>
        <a
          className={Foot.icon}
          href="https://fotos.fedeholc.ar"
          target="_blank"
        >
          <MdPhotoLibrary></MdPhotoLibrary>
        </a>
        <a
          className={Foot.icon}
          href="https://instagram.com/fedeholc"
          target="_blank"
        >
          <RiInstagramFill></RiInstagramFill>
        </a>
        <a className={Foot.icon} href="mailto: federicoholc@gmail.com">
          <MdEmail></MdEmail>
        </a>
      </div>
    </footer>
  );
}
