"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import auth from "./auth.module.css";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className={auth.auth__container}>
        <div className={auth.auth__mail}>{session?.user?.email ?? ""}</div>

        <button className={auth.auth__button} onClick={() => signOut()}>
          <MdLogout />
        </button>
      </div>
    );
  }
  return (
    <div className={auth.auth__container}>
      <button className={auth.auth__button} onClick={() => signIn()}>
        <MdLogin />
      </button>
    </div>
  );
}

export default function Auth() {
  const pathname = usePathname();
  return (
    <div>
      <AuthButton />
    </div>
  );
}
