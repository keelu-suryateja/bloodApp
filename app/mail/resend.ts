"use server"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

export const sendEmail = async (email: { email: string; otp: string }) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email.email,
    subject: "Your Blood Donation App Signup OTP",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to the Blood Donation App!</h2>
        <p>Thank you for signing up. To complete your registration, please use the following One-Time Password (OTP):</p>
        <p style="font-size: 20px; font-weight: bold; color: #d32f2f;">${email.otp}</p>
        <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
        <p>We’re excited to have you join our community of life-savers.</p>
        <hr />
        <p style="font-size: 12px; color: #555;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
}


export const SendUpdate = async (email: { email: string,postId:string }) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email.email,
    subject: "Good News! A Donor Has Been Found",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>We Found a Donor for You!</h2>
        <p>Dear User,</p>
        <p>We are pleased to inform you that a suitable donor has been identified for your request. 
        Please be prepared to coordinate with the donor and ensure timely communication.</p>
        <p>Our team will assist you with the next steps to make this process smooth and effective.</p>
        <p style="margin-top: 20px;">Thank you for being part of the Blood Donation App community.</p>
        <hr />
        <p style="font-size: 12px; color: #555;">This is an automated message. Please do not reply directly to this email.</p>
      <h2>Submit the aceeptence after recieving the blood</h2>

      <a href="https://blood-app-theta.vercel.app/confirm/${email.postId}">
        Click here to confirm if you received blood
      </a>
        </div>
    `,
  });
};