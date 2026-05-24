
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export  async function PUT(req:NextRequest){

    const { email,call } = await req.json();
   
    if(call==="not active")
            { try{
                await prisma.user.update({
                where:{email},
                data:{
                    isactive:false
                }
            })

                return NextResponse.json({"msg":"success"});
            
            }
            catch(e)
            {
                return NextResponse.json({"msg":"failed"});
            }
    }
    else
    {
        try{
            await prisma.user.update({
            where:{email},
            data:{
                isactive:true
            }
        })

            return NextResponse.json({"msg":"success"});
        
        }
        catch(e)
        {
            return NextResponse.json({"msg":"failed"});
        }
     }  
}