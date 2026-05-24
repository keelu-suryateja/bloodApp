
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import {sign} from "jsonwebtoken"
import * as z from "zod";
import bcrypt from "bcryptjs";
export async function  POST(req:NextRequest)
{
     
    const userschema=z.object({
        email:z.string().email(),
        password:z.string().min(6),
      
    })
    try{
        const userdata :{"email":string,"password":string}=await req.json();
        if(!userdata || !userdata.email || !userdata.password)
        {
            return NextResponse.json({"msg":"inputs are not valid"})
        }
        const res=userschema.safeParse(userdata);
        
        if(!res.success)
        {
            
            return NextResponse.json({"msg":"inputs are not valid"});
           
        }
        const user=await prisma.user.findUnique({
            where:{
                email:res.data.email,
            }
        })
        if(!user)
        {
            return NextResponse.json({"msg":"user not found"});
        }

        const isvalid=await bcrypt.compare(res.data.password,user.password)
        if(!isvalid)
        {
            return NextResponse.json({"msg":"incorrect password"});
        }
       else
       {
         const token=sign({email:userdata.email},process.env.JWT_PASS!,{expiresIn:"1w"});
        const response=NextResponse.json({"msg":"successful signin"});
        response.cookies.set("token",token,{httpOnly:true,path: "/",});
        return response;
       }
      
    }
    catch(e)
    {
        return NextResponse.json({"msg":"input error"});
    }
   
}