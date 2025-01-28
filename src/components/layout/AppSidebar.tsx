"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { GrTransaction } from "react-icons/gr";
import { IoCard } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { SiMoneygram } from "react-icons/si";
import Image from "next/image";
import { Button } from "../ui/button";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/send-money">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={50}
                  height={50}
                  unoptimized
                  className="aspect-square object-contain rounded-lg size-8"
                />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">SendEzy</span>
                  <span>Money</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="py-6 text-lg duration-200 transition-colors"
                  asChild
                >
                  <Link href="/send-money">
                    <SiMoneygram className="!size-5" />
                    <span>Send Money</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="py-6 text-lg duration-200 transition-colors"
                  asChild
                >
                  <Link href="/transactions">
                    <GrTransaction className="!size-5" />
                    <span>View all transactions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="py-6 text-lg duration-200 transition-colors"
                  asChild
                >
                  <Link href="/apply-for-loan">
                    <GiReceiveMoney className="!size-5" />
                    <span>Apply for loan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="py-6 text-lg duration-200 transition-colors"
                  asChild
                >
                  <Link href="/forex-card">
                    <IoCard className="!size-5" />
                    <span>Forex Card</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                onClick={() => {
                  deleteCookie("sezy");
                  router.push("/login");
                }}
              >
                Logout
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
