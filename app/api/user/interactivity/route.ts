import { SendUpdate } from "@/app/mail/nodemailer";
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { email } from "zod";

export async function POST(req:NextRequest){

    
    interface interactionschema{
        status:string
        user_id:string,
        post_id:string,
    }
    const userdata:interactionschema=await req.json();
    if(userdata.status==="Accept")
    {
        userdata.status="pending"
    }
    else
    {
        userdata.status="Rejected"
    }
    await prisma.interaction.create({
        data:{
            status:userdata.status,
            userid:userdata.user_id,
            postid:userdata.post_id
        }
    })
    const post = await prisma.post.findUnique({
  where: { id: userdata.post_id },
  select: { requestedBY: true } 
});

if (!post) {
  return NextResponse.json({ msg: "Post not found" }, { status: 404 });
}

const user = await prisma.user.findUnique({
  where: { id: post.requestedBY },
  select: { email: true }
});

if (!user) {
  return NextResponse.json({ msg: "User not found" }, { status: 404 });
}

await SendUpdate({ email: user.email ,postId:userdata.post_id});
console.log(user.email);
    return  NextResponse.json({"msg":"OK"})
}