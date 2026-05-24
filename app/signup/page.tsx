"use client"
import Topbar from "../components/topbar";
import axios from "axios";
import { useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [blood,setblood]=useState("");
  const [otp,setOtp]=useState("");
  const [showOtp,setShowOtp]=useState(false);


  async function requestOtp() {
    try {
      const response=await axios.post('/api/user/check',{email});
      if(response.data===true)
      {
         toast.error("Email already exists" ,{duration:3000});
         router.push('/signin');
         return;
      }
      const res = await axios.post("/api/user/otp", { email });
      if (res.data.msg === "OTP stored successfully") {
        toast.success("OTP sent to your email!");
        setShowOtp(true); // show OTP input
      }
    } catch {
      toast.error("Failed to send OTP");
    }
  }


  async function verifyOtpAndSignup() {
    try {
      const verifyRes = await axios.post("/api/user/verify", { email, otp });
      if (verifyRes.data.msg === "Verified") {
        const signupRes = await axios.post("/api/user/signup", {
          email,
          password,
          bloodtype: blood,
          username,
        }, { withCredentials: true });

        if (signupRes.data.msg === "inputs are not valid") {
          toast.error("Check the inputs");
          toast("Password: min 6 chars, bloodtype: B+/AB-, valid email", { duration: 7000 });
        } else {
          toast.success("Thank you for signing up!");
          router.push("/home");
        }
      } else {
        toast.error("Invalid OTP");
      }
    } catch {
      toast.error("Verification failed");
    }
  }

  const style="w-full rounded-xl m-2 p-3 hover:shadow-lg";

  return (
    <div>
      <Topbar />
      <div className="w-96 mt-20 m-auto border-2 border-gray-200 p-8 font-serif shadow-lg rounded-xl font-medium">
        <input className={style} onChange={(e)=>setusername(e.target.value)} placeholder="username" />
        <input className={style} onChange={(e)=>setemail(e.target.value)} placeholder="email" />
        <input className={style} onChange={(e)=>setpassword(e.target.value)} placeholder="password" type="password" />
        <input className={style} onChange={(e)=>setblood(e.target.value)} placeholder="bloodtype" />

        {!showOtp ? (
          <button className="bg-red-500 text-white w-full rounded-xl p-3 mt-4 hover:scale-105" onClick={requestOtp}>
            Request OTP
          </button>
        ) : (
          <>
            <input className={style} value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter OTP" />
            <button className="bg-green-500 text-white w-full rounded-xl p-3 mt-4 hover:scale-105" onClick={verifyOtpAndSignup}>
              Verify OTP & Signup
            </button>
          </>
        )}

        <div className="flex gap-3 p-4 mt-6">
          <p>Already have an account?</p>
          <button className="hover:scale-110 shadow-lg hover:shadow-xl hover:bg-red-500 hover:text-white rounded-lg w-1/3 tansition duration:300" onClick={()=>router.push('/signin')}>
            Signin
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
