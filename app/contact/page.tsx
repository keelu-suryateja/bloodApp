import prisma from "@/db"
import { verify } from "jsonwebtoken"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Topbar from "../components/topbar"
import { SendUpdate } from "../mail/resend"
export default async function Contactinfo(){
    
    const cookiesStore=cookies()
    const token=(await cookiesStore).get("token")?.value

    if(!token)
    {
        redirect('/signin')
    }
    const decode=verify(token,process.env.JWT_PASS!) as {email:string}
    const user_id=await prisma.user.findUnique({
        where:{
            email:decode.email
        }
    })
    if(user_id==null)
    {
        redirect('/signin')
    }
    
    const data=await prisma.interaction.findMany({
        where:{
            userid:user_id.id,
            status:"pending"
        },
        include:{
            Post:true
        },
        
    })
    
    return < div >
    <Topbar></Topbar>
    
    <div >
      <h1 className=" font-serif text-middle sm:font-serif text-2xl mt-5 mb-10 ml-5 font-bold mt">Thankyou for the acceptence of donation 🙌🙌🙌 </h1>   
        {data.map(interaction => (
        <div  className=" w-96 p-8 sm:border-1 sm:w-128  sm:ml-10 mt-5 rounded-lg sm:p-4 bg-slate-100 shadow-lg font-serif  text-xl mb-10 " key={interaction.id}>
          <h2>Phone number: {interaction.Post.phonenumber}</h2>
          <h2>Receiver name: {interaction.Post.reciever}</h2>
        </div>
      ))}
    </div>
    </div>
}