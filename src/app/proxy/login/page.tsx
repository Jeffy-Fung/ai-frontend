"use client";

import { signIn } from "@/app/helpers/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useContext } from "react";
import AuthContext from "@/store/AuthProvider";

export default function ProxyLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jwtToken = searchParams.get("jwtToken");
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (jwtToken) {
      signIn(jwtToken, router, setIsLoggedIn);
    }
  }, [jwtToken, router, setIsLoggedIn]);

  if (!jwtToken) {
    return <div>ProxyLogin</div>;
  }

  return <div>ProxyLogin</div>;
}
