import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verify } from "jsonwebtoken";
import * as z from "zod"; 
export  async function POST(req:NextRequest){

    const cookieStore=cookies()
    const token=( await cookieStore).get("token")?.value;
    enum blood{
            A_Positive = "A+",
            A_Negative = "A-",
            B_Positive = "B+",
            B_Negative = "B-",
            AB_Positive = "AB+",
            AB_Negative = "AB-",
            O_Positive = "O+",
            O_Negative = "O-"
            }
    const data:{"bloodtype":blood,"mobile":string}=await req.json();
    if(!data || !data.mobile || !data.bloodtype)
    {
        return NextResponse.json({"msg":"Input errors"})
    }

    const schema=z.object({
        bloodtype:z.string(),
        mobile:z.string().min(10)
    })
    const result= await schema.safeParse(data);
    if(!result.success)
    {
        return NextResponse.json({"msg":"input error"});
    }
    if(!token)
    {
         return NextResponse.redirect(new URL("/signin", req.url));
    }

    const decoded=verify(token,process.env.JWT_PASS!) as {email:string}
    const recievername=await prisma.user.findUnique({
        where:{email:decoded.email},
        select:{username:true}
    }) as {username:string}
    try{

        const user=await prisma.user.findUnique({
        where:{email:decoded.email}
    })

    if(user==null)
    {
        redirect('/signin')
    }
  
    const res=await prisma.post.create({
        data:{
            requestedBY:user.id,
            bloodtype:data.bloodtype,
            issolved:false,
            reciever:recievername.username,
            donor:"none",
            
            phonenumber:data.mobile
        }

    })
   
    return NextResponse.json({"msg":"Done"});
    }
    catch(e)
    {
        redirect("/profile")
    }
}