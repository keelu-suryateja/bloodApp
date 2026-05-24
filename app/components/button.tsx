"use client"
import { useRouter } from "next/navigation"
 export default function Navbutton({props}:{props:string}){
    const router=useRouter();
    function requestpage(){
        
        if(props==="Request")
        router.push("/requestpage")
        else if(props=="Profile")
        router.push('/profile')
        else
        router.push("/alerts")
    }
    return <>
    <button  onClick={requestpage} className=" hidden lg:block align-middle bg-neutral-100 w-34 text-black rounded-lg bg-white text-black px-5 py-2 rounded-xl font-medium
            hover:bg-red-500 hover:text-white
            hover:scale-110 hover:shadow-lg
            transition duration-300">{props}</button>
     
    </>

 }