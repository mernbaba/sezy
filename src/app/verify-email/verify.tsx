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
import { toast } from "sonner";

const Verify = ({ user }: { user: Student }) => {
  const [otp, setOtp] = useState("");
  const [genOTP, setGenOTP] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleOTPSend = async () => {
    try {
      const reponse = await sendOTP(user?.email, genOTP);

      toast.success("OTP Sent");

      console.log(reponse);

      setSent(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    console.log(otp, genOTP);
    if (otp === genOTP) {
      const updatedUser = await verifyEmail({ email: user?.email });
      setCookie("sezy", updatedUser?.user, {
        maxAge: 60 * 60 * 24 * 7,
      });

      toast.success("Email verified");
      router.push("/send-money");
    } else {
      toast.error("OTP verification failed");
    }
  };

  useEffect(() => {
    const tempotp = Math.floor(1000 + Math.random() * 9000).toString();
    setGenOTP(tempotp);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 md:p-8 h-64">
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

      <div className="flex gap-4">
        <Button onClick={handleOTPSend} className="w-24">
          {!sent ? "Send OTP" : "Resend OTP"}
        </Button>
        <Button type="button" onClick={handleVerifyOTP} className="w-24">
          Verify
        </Button>
      </div>
    </div>
  );
};

export default Verify;
