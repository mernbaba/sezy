import prisma from "@/lib/prisma";
import SendMoneyForm from "./SendMoneyForm";

const Page = async () => {
  const currencies = await prisma.currency.findMany({
    where: {
      status: {
        equals: true,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div>
      <SendMoneyForm currencies={currencies} />
    </div>
  );
};

export default Page;
