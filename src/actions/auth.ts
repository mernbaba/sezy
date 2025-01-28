"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function createUser(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referral?: string;
}) {
  try {
    const agent = await prisma.agent.findUnique({
      where: {
        email: payload?.referral,
      },
    });

    if (!agent) {
      return { error: "Agent not found" };
    }

    const hashedPassword = await bcrypt.hash(payload?.password, 10);

    const user = await prisma.student.create({
      data: {
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        email: payload?.email,
        password: hashedPassword,
        agentId: agent?.agentId,
      },
    });

    revalidatePath("/");

    return { user };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create user" };
  }
}

export async function loginUser(payload: { email: string; password: string }) {
  try {
    const user = await prisma.student.findUnique({
      where: {
        email: payload?.email,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const isValid = await bcrypt.compare(payload?.password, user?.password);

    if (!isValid) {
      return { error: "Invalid password" };
    }

    revalidatePath("/");

    return { user };
  } catch (error) {
    console.error(error);
    return { error: "Failed to login" };
  }
}
