import prisma from "@/db";
import { NextResponse } from "next/server";
import {sign}from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const record = await prisma.otp.findFirst({
    where: { email, code: otp },
  });

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json({ msg: "Invalid or expired OTP" }, { status: 400 });
  }

  
  const token = sign({ email }, process.env.JWT_PASS!, { expiresIn: "1w" });

  // Optionally delete OTP
  await prisma.otp.delete({ where: { id: record.id } });

  const res= NextResponse.json({ msg: "Verified", token });
 res.cookies.set("token",token,{httpOnly:true,path: "/",});
 return res;
}
