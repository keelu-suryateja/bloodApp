"use client"
import { useRouter } from "next/navigation"
export default function Homebutton(){
    const router=useRouter()
    return <div>
    <button onClick={()=>{router.push('/signup')}} className="  hidden lg:block hover:bg-green-300 hover:text-black text-xl p-4 transition duration-300 
    w-36 shadow-lg fixed right-10 rounded-lg  top-10 bg-olive-900 text-white hover:scale-110 ">Signup</button>
    <button className=" lg:hidden bg-olive-900 text-white p-2 rounded-lg fixed right-3 top-14 shadow-lg hover:bg-green-300 hover:scale-105 hover:text-black transition duration-300  sm:w-36" > Signup </button>
    </div>
}