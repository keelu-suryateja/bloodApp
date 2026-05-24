import prisma from "@/db";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LogoutButton from "../components/logout";
import Inactivebutton from "../components/inactive";
export default async function Profile() {
  const cookieStore = cookies(); // no await
 const token = (await cookieStore).get("token")?.value;

  if (!token) {
    redirect("/signin");
  }

  try {
    const decoded = verify(token, process.env.JWT_PASS!) as { email: string };

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      redirect("/signin");
    }

      const style="w-full rounded-xl m-2 p-3 shadow-sm font-bold" 

    return <>
      <div className="w-96 mt-30   m-auto border-2 border-gray-200 p-8 font-serif shadow-lg rounded-xl font-medium ">
        <h1 className={style}>{user.username}</h1>
        <h1 className={style} >{user.bloodtype}</h1>
        <h1 >{user.isactive}</h1>
       
        <div className="flex gap-10 mt-4 p-2 align-middle ">
          <p>I am not active anymore</p>
      <Inactivebutton props={
        {"email":user.email,
          "call":"not active"}
          }></Inactivebutton>
        </div>
         <div className="flex gap-10 mt-4 p-2 align-middle ">
          <p>I want to be active </p>
       <Inactivebutton  props={
        {"email":user.email,
          "call":"active"}
          } ></Inactivebutton>
        </div>
        <LogoutButton/>
      </div>
    </>;
  } catch (e) {
    redirect("/signin");
  }
}
