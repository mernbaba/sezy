"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { transport } from "@/lib/ses";

export async function createUser(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referral?: string;
}) {
  try {
    const getAgentId = async () => {
      if (!payload?.referral) {
        return "0088fb14-7265-465c-bf57-112fe1309bdd";
      }

      const agent = await prisma.agent.findUnique({
        where: {
          email: payload?.referral,
        },
      });

      return agent?.agentId ?? "0088fb14-7265-465c-bf57-112fe1309bdd";
    };

    const agentId = await getAgentId();
    const hashedPassword = await bcrypt.hash(payload?.password, 10);

    const user = await prisma.student.create({
      data: {
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        email: payload?.email,
        password: hashedPassword,
        agentId: agentId,
      },
    });

    await sendOnboardingEmail(payload?.email, payload?.password);

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

export async function verifyEmail(payload: { email: string }) {
  console.log(payload?.email);
  try {
    const user = await prisma.student.update({
      where: {
        email: payload?.email,
      },
      data: {
        emailverified: true,
      },
    });

    revalidatePath("/");

    return { user };
  } catch (error) {
    console.error(error);
    return { error: "Failed to verify email" };
  }
}

export async function sendOTP(email: string, otp: string) {
  try {
    const response = await transport.sendMail({
      from: process.env.AWS_SES_SMTP_EMAIL,
      to: email,
      subject: "Sendezy OTP",
      text: `Your OTP is ${otp}`,
    });

    return response;
  } catch (error) {
    console.error(error);
    return { error: "Failed to send OTP" };
  }
}

export async function sendOnboardingEmail(email: string, pass: string) {
  try {
    const response = await transport.sendMail({
      from: process.env.AWS_SES_SMTP_EMAIL,
      to: email,
      subject: "Welcome To Sendzy",
      text: `Your Sendzy account has been created. Your username is : ${email} and password is : ${pass}`,
    });

    console.log("Onboarding Email Sent", email);

    return response;
  } catch (error) {
    console.error(error);
    return { error: "Failed to send Onboarding Email" };
  }
}
