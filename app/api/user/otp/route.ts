import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import * as z from "zod";
import { sendEmail } from "@/app/mail/nodemailer";


    export async function POST(req: NextRequest) {
        
    const otpSchema =z.object({
    "email": z.string().email(),
    
    });
  try {
    const body:string = await req.json();
    const parsed = otpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ msg: "Invalid input" }, { status: 400 });
    }

    const { email } = parsed.data;
    const otp=String(Math.ceil(Math.random()*10000));
    await prisma.otp.create({
      data: {
        email,
        code: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
      },
    });
    await sendEmail({"email":email,"otp":otp})
    return NextResponse.json({ msg: "OTP stored successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
