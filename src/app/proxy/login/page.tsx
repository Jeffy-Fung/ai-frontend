"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProxyLogin({ jwtToken }: { jwtToken: string }) {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("jwtToken", jwtToken);
    router.push("/user-profile");
  }, [jwtToken, router]);

  return <div>ProxyLogin</div>;
}

export async function getServerSideProps(context: any) {
  const authHeader = context.req.headers.authorization;
  const jwtToken = authHeader ? authHeader.split(' ')[1] : null;

  return {
    props: { jwtToken: jwtToken },
  };
}
