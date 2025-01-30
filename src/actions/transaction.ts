"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { transport } from "@/lib/ses";

export async function createTransaction(payload: {
  studentId: string;
  email: string;
  agentId?: string;
  amount: number;
  forexRate: number;
  currencyId: string;
}) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount: payload?.amount,
        currencyId: payload?.currencyId,
        forexRate: payload?.forexRate,
        studentId: payload?.studentId,
        agentId: payload?.agentId,
      },
    });

    await transport
      .sendMail({
        from: process.env.AWS_SES_SMTP_EMAIL,
        to: payload?.email,
        subject: "Transaction Initiated",
        text: `A remittance Transaction has been initiated on Sendezy. The Transaction ID is as follow: ${transaction?.transactionId}. The Amount id ${transaction?.amount}`,
      })
      .catch((error) => {
        console.error(error);
      });

    revalidatePath("/transactions");

    return { transaction };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create transaction" };
  }
}
