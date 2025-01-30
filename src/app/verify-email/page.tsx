import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Student } from "@prisma/client";
import Verify from "./verify";

const Page = async () => {
  const userCookie = await getCookie("sezy", { cookies });
  const user = userCookie ? (JSON.parse(userCookie) as Student) : undefined;

  return user && <Verify user={user} />;
};

export default Page;
