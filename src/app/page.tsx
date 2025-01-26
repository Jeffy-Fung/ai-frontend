"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLogin } from "@/app/helpers/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.replace("/user-profile");
    } else {
      router.replace("/sign-in");
    }
  }, [router]);

  return <div>Home</div>;
}

