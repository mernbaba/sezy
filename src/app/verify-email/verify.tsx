"use client";

import { Button } from "@/components/ui/button";
import { Student } from "@prisma/client";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { sendOTP, verifyEmail } from "@/actions/auth";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

const Verify = ({ user }: { user: Student }) => {
  const [otp, setOtp] = useState("");
  const [genOTP, setGenOTP] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleOTPSend = async () => {
    try {
      const tempotp = Math.floor(1000 + Math.random() * 9000).toString();
      setGenOTP(tempotp);

      const reponse = await sendOTP(user?.email, tempotp);

      console.log(reponse);

      setSent(true);
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    console.log(otp, genOTP);
    if (otp === genOTP) {
      console.log("OTP verified");
      const updatedUser = await verifyEmail({ email: user?.email });
      setCookie("sezy", updatedUser?.user, {
        maxAge: 60 * 60 * 24 * 7,
      });

      alert("Email verified");
      router.push("/send-money");
    } else {
      console.log("OTP verification failed");
      alert("OTP verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Verify Email</h1>
      <p>
        {user ? `Welcome, ${user?.email}` : "You need to verify your email"}
      </p>

      {!sent ? (
        <Button onClick={handleOTPSend}>Send OTP</Button>
      ) : (
        <>
          <InputOTP
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            required
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>

          <Button type="button" onClick={handleVerifyOTP}>
            Verify
          </Button>
        </>
      )}
    </div>
  );
};

export default Verify;
