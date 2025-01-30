"use client";

import { createUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  interface Payload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    referral?: string;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form
                className="p-6 md:p-8"
                action={async (e) => {
                  const formData = Object.fromEntries(e.entries());

                  const payload: Payload = {
                    firstName: formData["firstName"] as string,
                    lastName: formData["lastName"] as string,
                    email: formData["email"] as string,
                    password: formData["password"] as string,
                    referral: formData["referral"] as string,
                  };

                  const { user, error } = await createUser(payload);

                  if (error) {
                    console.error("err: ", error);
                    return;
                  } else {
                    setCookie("sezy", user, {
                      maxAge: 60 * 60 * 24 * 7,
                    });

                    router.push("/send-money");
                  }
                }}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="text-balance text-muted-foreground">
                      Sign up for a new SendEzy account
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="referral">Referral</Label>
                    <Input
                      id="referral"
                      name="referral"
                      type="email"
                      placeholder="Enter referral code"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </form>
              <div className="relative hidden bg-[#00285C] md:block">
                <Image
                  src="/logo.jpg"
                  alt="Image"
                  className="absolute inset-0 w-full my-auto object-cover dark:brightness-[0.2] dark:grayscale"
                  width={600}
                  height={800}
                  unoptimized
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <Link href="/">Terms of Service</Link> and{" "}
            <Link href="/">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
