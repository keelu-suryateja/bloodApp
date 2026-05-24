"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Dropbutton() {
  const [open, setOpen] = useState(false);
  const router=useRouter();
  const style="hover:bg-red-500 hover:scale-115 transition duration-300 rounded-md p-1"
  return (
    <div className="fixed top-10 right-4 sm:right-20 md:w-36">
      <button
        onClick={() => setOpen(!open)}
        className=" hover:scale-105 shadow-lg tranition duration-300 hover:bg-red-400 text-xl font-serif w-24 rounded-md shadow-lg bg-slate-100 text-black lg:hidden"
      >
        Services
      </button>

      {open && (
        
        <div className="  mt-2 flex flex-col gap-2 bg-black shadow-md rounded-lg p-2">
          <button className={style} onClick={()=>{router.push('/alerts')}}>Alerts</button>
          <button className={style} onClick={()=>{router.push('/requestpage')}} >Request</button>
          <button className={style} onClick={()=>{router.push('/profile')}} >Profile</button>
        </div>
      )}
    </div>
  );
}
