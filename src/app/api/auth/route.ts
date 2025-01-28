import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  // TODO: is there a better way to pass the jwtToken?
  const url = new URL(request.url);
  const jwtToken = url.searchParams.get('jwtToken');

  try {
    jwt.verify(jwtToken, process.env.JWT_SECRET);
    return NextResponse.redirect(new URL("/proxy/login?jwtToken=" + jwtToken, request.url));
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.json({ error: { message: "Invalid token." } }, { status: 401 });
  }
}
