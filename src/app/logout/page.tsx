"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth-context";

export default function LogoutPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      await signOut();
      router.push("/");
    };

    doLogout();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-600 text-lg">Logging you out...</p>
    </div>
  );
}
