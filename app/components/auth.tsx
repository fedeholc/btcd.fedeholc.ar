"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import auth from "./auth.module.css";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
/* const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700"; */

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className={auth.auth__container}>
        {/*         {session?.user?.email ?? ""}
         */}
        <button onClick={() => signOut()}>
          <MdLogout />
        </button>
      </div>
    );
  }
  return (
    <div className={auth.auth__container}>
      {/*  Not signed in <br /> */}
      <button onClick={() => signIn()}>
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
      {/* cada uno de los enlaces comentados lleva a una forma distinta de usar next auth */}
      {/* active route o inactive pone distintas clases según si se está en esa página o no
      como para que aparezca resaltada la que estás */}
      {/*  <hr className="my-4" />
      <ul>
        <Link href="/">
          <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </li>
        </Link>
        <Link href="/protected">
          <li
            className={
              pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Protected Route
          </li>
        </Link>
        <Link href="/serverAction">
          <li
            className={
              pathname === "/serverAction" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Server Action
          </li>
        </Link>
        <Link href="/apiFromClient">
          <li
            className={
              pathname === "/apiFromClient" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Client
          </li>
        </Link>
        <Link href="/apiFromServer">
          <li
            className={
              pathname === "/apiFromServer" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Server
          </li>
        </Link>
      </ul> */}
    </div>
  );
}
