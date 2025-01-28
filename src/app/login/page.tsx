"use client";

import { loginUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaApple, FaGoogle, FaMeta } from "react-icons/fa6";
import { setCookie } from "cookies-next";

const Page = () => {
  const router = useRouter();

  interface Payload {
    email: string;
    password: string;
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
                    email: formData["email"] as string,
                    password: formData["password"] as string,
                  };

                  const { user, error } = await loginUser(payload);

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
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-balance text-muted-foreground">
                      Login to your SendEzy account
                    </p>
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
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="w-full">
                      <FaApple />
                      <span className="sr-only">Login with Apple</span>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FaGoogle />
                      <span className="sr-only">Login with Google</span>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FaMeta />
                      <span className="sr-only">Login with Meta</span>
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="underline underline-offset-4"
                    >
                      Sign up
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
