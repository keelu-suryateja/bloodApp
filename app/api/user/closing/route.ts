import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
  try {
    const { id }:{id:string} = await req.json(); 
   
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { issolved: true },
    });
    
    const res=await prisma.interaction.updateMany({
      where:{
        postid:id,
        status:"pending"
      },
      data:{
        status:"solved"
      }
    })
    return NextResponse.json({ msg: "OK", post: updatedPost });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Error updating post" }, { status: 500 });
  }
}
