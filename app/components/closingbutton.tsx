"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ClosingButton({ id }: { id: string }) {
  const router = useRouter();
  
  async function closed() {
    const res = await axios.put("/api/user/closing", { id });
    if (res.data.msg === "OK") {
      router.push("/home");
    }
  }

  return <button className="bg-slate-900 rounded-lg w-48  text-white font-serif p-2 hover:scale-110 
  transition duration:500 hover:bg-green-400" onClick={closed}>Submit</button>;
}
