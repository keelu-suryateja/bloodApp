import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req:NextRequest){
    const cookiesStore=cookies();
    const token=(await cookiesStore).get("token")?.value

    const res=NextResponse.json({"msg":"success"});
    res.cookies.delete("token");
    return res;
}