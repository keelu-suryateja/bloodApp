"use client"

import axios from "axios"

import {toast, Toaster} from "react-hot-toast";
export default  function Inactivebutton({props}:{props:{"email":string,"call":string}}){
 
    async function inactivehandler(){
        const res= await axios.put("/api/user/inactive",{ "email":props.email,"call":props.call });
      
        if(res.data.msg==="success")
        {
            toast.success("You are inactive now",{duration:4000});
        }
        else
        {
            toast.error("Try again later")
        }
    }

    async function activehandler(){
        const res= await axios.put("/api/user/inactive", {"email": props.email,"call":props.call} );
      
        if(res.data.msg==="success")
        {
            toast.success("You are active now",{duration:4000});
        }
        else
        {
            toast.error("Try again later")
        }
    }
    return <>
    <Toaster></Toaster>
    {
        props.call==="active"?<button onClick={activehandler} className="  bg-gray-900 p-1  shadow-lg text-white w-2/4   transition duration:400 hover:bg-Green-500 hover:shadow-lg hover:scale-110" >active</button>:<button onClick={inactivehandler} className="  bg-gray-900 p-1  shadow-lg text-white w-2/4   transition duration:400 hover:bg-red-500 hover:shadow-lg hover:scale-110" > Not active</button>
    }

     </>
}