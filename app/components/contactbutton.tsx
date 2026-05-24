"use client"
import { useRouter } from "next/navigation";
export default function ContactButton(){
    const router=useRouter()
    function contacthandler(){
        router.push('/contact');
    }
    return (<>
    
        <button className=" hidden sm:block bg-red-100 p-4 absolute rounded-lg left-0 lg:left-10 top-15 font-serif text-md
        font-bold hover:scale-105 hover:bg-red-500 transition duration-200" onClick={contacthandler}> Contacts info </button>
        <button className=" sm:hidden bg-red-100 p-2  absolute rounded-xl right-0 top-23  font-serif text-md
        font-bold hover:scale-105 hover:bg-red-500 transition duration-200">Phone</button>
        </>
    );
}