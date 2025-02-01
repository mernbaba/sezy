import prisma from "@/lib/prisma";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { Student } from "@prisma/client";
import TransactionPage from "./TransactionPage";

export const dynamicParams = true;
export const revalidate = 0;

const Page = async () => {
  const userCookie = await getCookie("sezy", { cookies });
  const user = userCookie ? (JSON.parse(userCookie) as Student) : undefined;

  const transactions = await prisma.transaction.findMany({
    where: {
      studentId: {
        equals: user?.studentId,
      },
    },
    include: {
      Currency: true,
      Student: true,
    },
    orderBy: [
      {
        status: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const currencies = await prisma.currency.findMany();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-primary">Transactions</h1>

      <TransactionPage transactions={transactions} currencies={currencies} />
    </div>
  );
};

export default Page;
