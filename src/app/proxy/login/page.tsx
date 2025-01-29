"use client";

import { saveItem } from "@/app/helpers/storage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ProxyLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jwtToken = searchParams.get("jwtToken");

  useEffect(() => {
    if (jwtToken) {
      saveItem("jwtToken", jwtToken);
      router.push("/user-profile");
    }
  }, [jwtToken, router]);

  if (!jwtToken) {
    return <div>ProxyLogin</div>;
  }

  return <div>ProxyLogin</div>;
}
