import prisma  from "@/db"
import {verify} from "jsonwebtoken"
import { cookies } from "next/headers";
import Topbar from "./topbar";
import Interactionbutton from "../interaction.tsx/page";
import ContactButton from "./contactbutton";
import { redirect } from "next/navigation";


export  default async function Result(){
    
    
    const cookieStore=cookies();
    const token=(await cookieStore).get("token")?.value
    if(!token)
    {
        redirect('/signin')
    }
    const decode= await verify(token!,process.env.JWT_PASS!) as { email: string };


    const userblood=await prisma.user.findUnique({
        where:{
            email:decode.email
        },
        select:{
            bloodtype:true
        }
    })
    const userid=await prisma.user.findUnique({
        where:{
            email:decode.email
        },
        select:{
            id:true
        }
    })

    
   
const data = await prisma.post.findMany({
  where: {
    issolved: false,
    bloodtype: userblood!.bloodtype,
    Interaction: {
      none: {
        userid: userid!.id   
      }
    }
  },
  include: {
    Interaction: true 
  }
});
  
   
   return(
    <div>
       <ContactButton />
        
    <Topbar></Topbar>
    {   
        data?.map(user=>{
            
                return(
                    <div key={user.id } className="flex gap-5 p-4  font-serif text-2xl mt-3   align-center">
                        <div ><h1 > • {user.reciever} is requesting {user.bloodtype} blood</h1></div>
                        <Interactionbutton status="Accept" user_id={userid!.id} post_id={user.id} phoneNumber={user.phonenumber} recieverName={user.reciever}></Interactionbutton>
                          <Interactionbutton status="Reject" user_id={user.requestedBY} post_id={user.id} phoneNumber={user.phonenumber} recieverName={user.reciever}></Interactionbutton>
                    </div>
                )
            
        })
        
    }

   </div>
   );
   
}

