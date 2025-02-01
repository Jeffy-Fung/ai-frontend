"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/store/AuthProvider";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/user-profile");
    } else {
      router.replace("/sign-in");
    }
  }, [router, isLoggedIn]);

  return <div>Home</div>;
}
