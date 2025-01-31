import prisma from "@/lib/prisma";
import BeneficiaryForm from "./BeneficiaryForm";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const transaction = await prisma.transaction.findFirst({
    where: {
      transactionId: {
        equals: id,
      },
    },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium">Beneficiary Details</h1>

      <h3 className="text-xl">Remit To</h3>

      {transaction && <BeneficiaryForm transaction={transaction} />}
    </div>
  );
};

export default Page;
