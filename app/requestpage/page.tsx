"use client";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestPage() {
  enum BLOOD {
    A_Positive = "A+",
    A_Negative = "A-",
    B_Positive = "B+",
    B_Negative = "B-",
    AB_Positive = "AB+",
    AB_Negative = "AB-",
    O_Positive = "O+",
    O_Negative = "O-",
  }

  const [blood, setBlood] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlerequest() {
    setLoading(true);

    const schema = z.object({
      bloodtype: z.nativeEnum(BLOOD),
      mobile: z.string().min(10),
    });

    const result = schema.safeParse({ bloodtype: blood, mobile: phone });
    if (!result.success) {
      setLoading(false);
      return toast.error("Enter valid inputs (example B+/AB+)", { duration: 3000 });
    }

    try {
      const res = await axios.post("/api/user/request", {
        bloodtype: blood,
        mobile: phone,
      });

      if (res.data.msg === "Done") {
        toast.success(
          "Request is completed. Please wait for response, we’ll send an email once we find a donor.",
          { duration: 8000 }
        );
        setTimeout(() => router.push("/home"), 4000);
      } else if (res.data.msg === "input error") {
        toast.error("Enter valid inputs. Blood type (example B+/AB-)", { duration: 4000 });
      } else {
        toast.error("Try again after sometime (1 min)");
      }
    } catch (err) {
      toast.error("Server error, please retry.");
    } finally {
      setLoading(false);
    }
  }

  const style = "w-full rounded-xl m-2 p-3 hover:shadow-lg";

  return (
    <>
      <Toaster />
      <div className="w-96 mt-20 m-auto border-2 border-gray-200 p-8 font-serif shadow-lg rounded-xl font-medium">
        <input
          className={style}
          onChange={(e) => setBlood(e.target.value)}
          placeholder="Blood type"
          type="text"
        />
        <input
          className={style}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile number"
          type="text"
        />

        <div className="w-2/3 m-2 rounded-xl text-center ml-15">
          <button
            className="bg-red-600 w-full text-white rounded-xl hover:bg-red-500 hover:scale-105 hover:shadow-lg transition duration-300 p-3 flex items-center justify-center"
            onClick={handlerequest}
            disabled={loading}
          >
            {loading ? (
              <>
                {/* Spinner */}
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
