"use client";

import { Button } from "@/components/ui/button";
import { Student } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
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
      const reponse = await sendOTP(user?.email, genOTP);

      alert("OTP Sent");

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

  useEffect(() => {
    const tempotp = Math.floor(1000 + Math.random() * 9000).toString();
    setGenOTP(tempotp);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 md:p-8 h-64">
      <Button onClick={handleOTPSend}>
        {!sent ? "Send OTP" : "Resend OTP"}
      </Button>
      <InputOTP
        maxLength={4}
        pattern={REGEXP_ONLY_DIGITS}
        value={otp}
        required
        onChange={(value) => setOtp(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} className="border-black/80" />
          <InputOTPSlot index={1} className="border-black/80" />
          <InputOTPSlot index={2} className="border-black/80" />
          <InputOTPSlot index={3} className="border-black/80" />
        </InputOTPGroup>
      </InputOTP>

      <Button type="button" onClick={handleVerifyOTP}>
        Verify
      </Button>
    </div>
  );
};

export default Verify;
