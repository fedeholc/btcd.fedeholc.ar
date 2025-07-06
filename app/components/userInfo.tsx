"use client";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  if (!session?.user?.name) return null;

  return <div className="user-info">{session.user.name}</div>;
}
