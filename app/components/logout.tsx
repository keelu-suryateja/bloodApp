"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export  default  function LogoutButton(){
     const router=useRouter();
    async function logout(){
       const res= await axios.post('/api/user/logout');
       if(res.data.msg=="success")
       {
        toast.success("You are logged out",{duration:2000})
         router.push('/signup');
       }
       else
       {
        toast.error("Try later");
       }
    }
    return (<>
        <Toaster></Toaster>
     <div onClick={logout} className="bg-gray-900 p-4 shadow-lg rounded-xl  mt-4 transition duration:400 hover:bg-red-500 hover:shadow-lg hover:scale-110"><button className="w-full text-white  ">Logout</button></div>
    </>);
}