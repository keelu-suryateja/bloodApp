"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import {toast,Toaster} from "react-hot-toast"


interface interaction{
    "status":string,
    "user_id":string,
    "post_id":string,
    "recieverName":string,
    "phoneNumber":string
}
export default function Interactionbutton(props:interaction){

    const router=useRouter()
    async function acceptstatus(){
        const res=await axios.post("/api/user/interactivity",{"status":props.status,"user_id":props.user_id,"post_id":props.post_id});
        if(res.data.msg=="OK")
        {
            toast.success("Thanyou for the donation,You are my hero",{duration:3000});
            
           router.push('/contact')
        }
    }
    async function rejectstatus(){
          const res=await axios.post("/api/user/interactivity",{"status":props.status,"user_id":props.user_id,"post_id":props.post_id});
         if(res.data.msg=="OK")
        {
            toast.success("Thankyou for the response");
        }
    }
    return (
        <div>
            <Toaster></Toaster>
             <div onClick={()=>{
                {props.status==="Accept"? acceptstatus():rejectstatus()

             }} }className=" hover:hover:bg-red-400 transtion duration-300 shadow-lg hover:scale-110 bg-gray-900 p-2 rounded-xl text-whitecenter"><button  disabled={false} className=" text-white   "> {props.status}</button></div>
        </div>
    );
}