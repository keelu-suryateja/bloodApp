
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import {sign} from "jsonwebtoken"
import * as z from "zod";
import bcrypt from "bcryptjs";
export async function  POST(req:NextRequest)
{
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
    const userschema=z.object({
        username:z.string().min(1),
        email:z.string().email(),
        password:z.string().min(6),
        bloodtype:z.nativeEnum(blood)
    })
    try{
        const userdata=await req.json();

        const res=userschema.safeParse(userdata);
        if(!res.success)
        {
            return NextResponse.json({"msg":"inputs are not valid"});
        }

        const saltRounds=10
        const hashedPassword=await bcrypt.hash(res.data.password,saltRounds);
        await prisma.user.create({
            data:{
                email:res.data.email,
                password:hashedPassword,
                username:res.data.username,
                bloodtype:res.data.bloodtype
            }
        })

        const token=sign({email:res.data.email},process.env.JWT_PASS!,{expiresIn:"1w"});
        console.log(token);
        const response=NextResponse.json({"msg":"successful signup"});
        response.cookies.set("token",token,{httpOnly:true,path: "/",});
        return response;
    }
    catch(e)
    {
        return NextResponse.json({"msg":"input error"});
    }
   
}