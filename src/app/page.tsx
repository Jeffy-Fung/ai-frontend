"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/app/helpers/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/user-profile");
    } else {
      router.replace("/sign-in");
    }
  }, [router]);

  return <div>Home</div>;
}
