import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

// To handle a GET request to /api
export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: { message: "Authorization header required." } }, { status: 401 });
  }

  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: { message: "Bearer token required." } }, { status: 401 });
  }

  const jwtToken = authHeader.split(' ')[1]; // Get the token part after "Bearer "

  try {
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    return NextResponse.redirect(new URL("/proxy/login", request.url), {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
    });
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.json({ error: { message: "Invalid token." } }, { status: 401 });
  }
}
