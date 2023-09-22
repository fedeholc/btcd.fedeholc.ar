import Logo from "./logo";
import navbar from "./navbar.module.css";
import { MdEmail, MdPhotoLibrary } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import Link from "next/link";
import PiDotThin from "react-icons/pi";
import AuthButton from "./auth";
import Footer from "./footer";
export default function NavBar() {
  return (
    <>
      <div className={navbar.navbar}>
        <div className={navbar.top}>
          <AuthButton></AuthButton>
          <div className={navbar.navbar__links}>
            <a href="https://fotos.fedeholc.ar" target="_blank">
              <MdPhotoLibrary></MdPhotoLibrary>
            </a>
            <a href="https://instagram.com/fedeholc" target="_blank">
              <RiInstagramFill></RiInstagramFill>
            </a>
            <a href="mailto: federicoholc@gmail.com">
              <MdEmail></MdEmail>
            </a>
          </div>
        </div>

        <div className={navbar.navbar__logo}>
          <Logo></Logo>
        </div>
      </div>
    </>
  );
}
