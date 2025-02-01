import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Student } from "@prisma/client";
import Verify from "./verify";

const Page = async () => {
  const userCookie = await getCookie("sezy", { cookies });
  const user = userCookie ? (JSON.parse(userCookie) as Student) : undefined;

  return (
    user && (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-3xl font-bold">Verify Email</h1>
        <p>
          {user ? `Welcome, ${user?.email}` : "You need to verify your email"}
        </p>

        <Verify user={user} />
      </div>
    )
  );
};

export default Page;
