"use client"
import Topbar from "../components/topbar";
import axios from "axios";
import { useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation'
export default  function Home() {
    const router = useRouter();
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
   async function userSignin    ()
   {
      try{
        const res=await axios.post("/api/user/signin",{
        "email":email,
        "password":password,
        
        },{ withCredentials: true })

        
    if (res.data.msg === "inputs are not valid") {
      toast.error("Check the inputs");
    }
     else if (res.data.msg === "incorrect password") {
      toast.error("Incorrect password");
    } 
    else if (res.data.msg === "user not found") {
      toast.error("Please signup before login");
      router.push("/signup");
    }
     else {
      toast.dismiss();
      toast.success("Welcome back");
      router.push("../home");
    }
      }catch(e)
      {
        toast.error("check the inputs");
      
      }
   }

   const style="w-full rounded-xl m-2 p-3 hover:shadow-lg" 
  return (
    < div >
         <Topbar></Topbar>
        <div  className="w-96 mt-20   m-auto border-2 border-gray-200 p-8 font-serif shadow-lg rounded-xl font-medium ">
        
        
        <input   className={style} onChange={(e)=>{setemail(e.target.value)}}  placeholder="email" type="text" name="" id="" /> <br />
        <input  className={style} onChange={(e)=>{setpassword(e.target.value)}}  placeholder="password" type="text" name="" id="" /> <br />
       
        <div className="w-2/3 m-2 rounded-xl text-center  ml-15"> <button className="bg-mist-900 w-full text-white  rounded-xl hover:bg-red-500 hover:text-white
              hover:scale-105 hover:shadow-lg
              transition duration-300 p-3 " onClick={userSignin}> submit </button>
              </div>
        <div className="flex gap-3  p-4 mt-6 ">
          <p className="">Don't have an account!</p>
          <button className="  hover:shadow-lg hover:scale-105 hover:bg-red-500 hover:text-white transition duration-400  text-gray rounded-lg w-1/3 " onClick={()=>{router.push('/signup')}}>  signup</button>
        </div>
      </div>
       
     
        <Toaster/>
      </div>
  
  );
}
