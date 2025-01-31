"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateStudent(payload: {
  key: string;
  value: string | Date;
  studentId: string;
}) {
  try {
    const student = await prisma.student.update({
      where: {
        studentId: payload?.studentId,
      },
      data: {
        [payload?.key]: payload?.value,
      },
    });

    revalidatePath("/");

    return { student };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update student" };
  }
}

export async function updateTransaction(payload: {
  key: string;
  value: string | Date;
  transactionId: string;
}) {
  try {
    const student = await prisma.transaction.update({
      where: {
        transactionId: payload?.transactionId,
      },
      data: {
        [payload?.key]: payload?.value,
      },
    });

    revalidatePath("/transactions");

    return { student };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update student" };
  }
}
