

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// ======================================================
// PROFESSIONAL OTP EMAIL
// ======================================================

export const sendEmail = async (email: {
  email: string;
  otp: string;
}) => {
  await transporter.sendMail({
    from: `"Blood Connect" <${process.env.EMAIL_USER}>`,
    to: email.email,
    subject: "Verify Your Account • Blood Connect",

    html: `
    <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 20px;">

            <table width="600" cellpadding="0" cellspacing="0"
              style="
                background:white;
                border-radius:16px;
                overflow:hidden;
                box-shadow:0 10px 30px rgba(0,0,0,0.08);
              ">

              <!-- HEADER -->
              <tr>
                <td
                  align="center"
                  style="
                    background:linear-gradient(135deg,#dc2626,#991b1b);
                    padding:40px 20px;
                    color:white;
                  "
                >
                  <h1 style="margin:0;font-size:34px;font-weight:bold;">
                    Blood Connect
                  </h1>

                  <p style="margin-top:10px;font-size:15px;opacity:0.9;">
                    Connecting Donors. Saving Lives.
                  </p>
                </td>
              </tr>

              <!-- BODY -->
              <tr>
                <td style="padding:45px 40px;">

                  <h2 style="margin:0;color:#111827;font-size:28px;">
                    Verify Your Email
                  </h2>

                  <p style="
                    margin-top:20px;
                    color:#4b5563;
                    font-size:16px;
                    line-height:1.8;
                  ">
                    Welcome to Blood Connect.
                    Please use the verification code below
                    to complete your registration securely.
                  </p>

                  <!-- OTP BOX -->
                  <div
                    style="
                      margin:40px auto;
                      width:260px;
                      background:#fef2f2;
                      border:2px dashed #dc2626;
                      border-radius:14px;
                      padding:25px;
                      text-align:center;
                    "
                  >

                    <p style="
                      margin:0;
                      color:#6b7280;
                      font-size:14px;
                      text-transform:uppercase;
                      letter-spacing:1px;
                    ">
                      Your OTP Code
                    </p>

                    <h1 style="
                      margin:15px 0 0;
                      color:#dc2626;
                      font-size:46px;
                      letter-spacing:10px;
                    ">
                      ${email.otp}
                    </h1>

                  </div>

                  <p style="
                    color:#6b7280;
                    font-size:15px;
                    line-height:1.8;
                  ">
                    This code is valid for
                    <strong>5 minutes</strong>.
                    Never share this OTP with anyone.
                  </p>

                  <p style="
                    margin-top:20px;
                    color:#6b7280;
                    font-size:15px;
                    line-height:1.8;
                  ">
                    If you did not request this verification,
                    you may safely ignore this email.
                  </p>

                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td
                  align="center"
                  style="
                    background:#f9fafb;
                    padding:30px;
                    border-top:1px solid #e5e7eb;
                  "
                >

                  <p style="
                    margin:0;
                    color:#9ca3af;
                    font-size:13px;
                  ">
                    © 2026 Blood Connect. All rights reserved.
                  </p>

                  <p style="
                    margin-top:10px;
                    color:#9ca3af;
                    font-size:12px;
                  ">
                    Helping patients connect with life-saving blood donors.
                  </p>

                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </div>
    `,
  });
};

// ======================================================
// PROFESSIONAL DONOR UPDATE EMAIL
// ======================================================

export const SendUpdate = async (email: {
  email: string;
  postId: string;
}) => {
  await transporter.sendMail({
    from: `"Blood Connect" <${process.env.EMAIL_USER}>`,
    to: email.email,
    subject: "A Donor Has Responded • Blood Connect",

    html: `
    <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 20px;">

            <table width="600" cellpadding="0" cellspacing="0"
              style="
                background:white;
                border-radius:16px;
                overflow:hidden;
                box-shadow:0 10px 30px rgba(0,0,0,0.08);
              ">

              <!-- HEADER -->
              <tr>
                <td
                  align="center"
                  style="
                    background:linear-gradient(135deg,#dc2626,#991b1b);
                    padding:40px 20px;
                    color:white;
                  "
                >

                  <h1 style="margin:0;font-size:34px;">
                    Blood Connect
                  </h1>

                  <p style="margin-top:10px;font-size:15px;opacity:0.9;">
                    Connecting Donors. Saving Lives.
                  </p>

                </td>
              </tr>

              <!-- BODY -->
              <tr>
                <td style="padding:45px 40px;">

                  <h2 style="
                    margin:0;
                    color:#111827;
                    font-size:28px;
                  ">
                    A Donor Has Responded
                  </h2>

                  <p style="
                    margin-top:22px;
                    color:#4b5563;
                    font-size:16px;
                    line-height:1.8;
                  ">
                    Great news! A donor has shown interest in helping
                    with your blood request.
                  </p>

                  <p style="
                    color:#4b5563;
                    font-size:16px;
                    line-height:1.8;
                  ">
                    Please continue the process responsibly and maintain
                    timely communication with the donor.
                  </p>

                  <!-- ACTION CARD -->
                  <div style="
                    margin-top:35px;
                    background:#fef2f2;
                    border-left:5px solid #dc2626;
                    padding:22px;
                    border-radius:10px;
                  ">

                    <h3 style="
                      margin:0;
                      color:#111827;
                      font-size:18px;
                    ">
                      Confirm Blood Reception
                    </h3>

                    <p style="
                      margin-top:12px;
                      color:#6b7280;
                      font-size:15px;
                      line-height:1.7;
                    ">
                      Once you successfully receive the blood,
                      please confirm it using the button below.
                    </p>

                    <div style="margin-top:25px;">

                      <a
                        href="https://blood-app-theta.vercel.app/confirm/${email.postId}"
                        style="
                          display:inline-block;
                          background:#dc2626;
                          color:white;
                          text-decoration:none;
                          padding:14px 26px;
                          border-radius:8px;
                          font-size:15px;
                          font-weight:bold;
                        "
                      >
                        Confirm Blood Received
                      </a>

                    </div>

                  </div>

                  <p style="
                    margin-top:30px;
                    color:#9ca3af;
                    font-size:13px;
                    line-height:1.7;
                  ">
                    This is an automated notification from Blood Connect.
                    Please do not reply directly to this email.
                  </p>

                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td
                  align="center"
                  style="
                    background:#f9fafb;
                    padding:30px;
                    border-top:1px solid #e5e7eb;
                  "
                >

                  <p style="
                    margin:0;
                    color:#9ca3af;
                    font-size:13px;
                  ">
                    © 2026 Blood Connect. All rights reserved.
                  </p>

                  <p style="
                    margin-top:10px;
                    color:#9ca3af;
                    font-size:12px;
                  ">
                    Helping patients connect with life-saving blood donors.
                  </p>

                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </div>
    `,
  });
};