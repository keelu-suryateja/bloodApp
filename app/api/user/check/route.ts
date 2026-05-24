import prisma from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ exists: true });
  } else {
    return NextResponse.json({ exists: false });
  }
}
