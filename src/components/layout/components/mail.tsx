/** @format */
"use client";
import * as React from "react";
import { cn } from "@/src/lib/utils";
import { Separator } from "@/src/components/ui/separator";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/components/ui/resizable";
import { Nav } from "./nav";
import { AccountSwitcher } from "./account-switcher";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { sidebarLink } from "./sidebar-link";
import { navLink } from "./nav-link";
import Link from "next/link";
import { useAuthContext } from "@/src/context/useAuthContext";
import { toast } from "@/src/components/ui/use-toast";

export function Mail({
  children,
  // defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [titleState, setTitleState] = React.useState<string>("Inbox");
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const { logout, isLoggedIn } = useAuthContext();
  const onLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      toast({ title: "Something went wrong", description: error.message });
    }
  };
  const { user } = useAuthContext();
  const acc = {
    label: user?.name ?? "undefined",
    email: user?.email ?? "undefined",
    icon: (
      <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
        <title>Vercel</title>
        <path d='M24 22.525H0l12-21.05 12 21.05z' fill='currentColor' />
      </svg>
    ),
  };

  return (
    <ResizablePanelGroup
      direction='horizontal'
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className='h-full max-h-screen  items-stretch'
    >
      <div className='hidden sm:block'>
        {" "}
        {/* Hide on small screens */}
        <ResizablePanel
          defaultSize={265}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={50}
          // @ts-ignore
          onCollapse={(collapsed) => {
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={acc} />
          </div>
          <Separator />

          <Nav
            setTitleState={setTitleState}
            isCollapsed={isCollapsed}
            links={sidebarLink}
          />
          <Separator />
          <Nav
            setTitleState={setTitleState}
            isCollapsed={isCollapsed}
            links={navLink}
          />
          <Separator />
          {/* <Button variant={"ghost"} className='w-full'>
      
    </Button> */}
        </ResizablePanel>
      </div>

      <ResizablePanel defaultSize={440} minSize={30}>
        <div className='flex items-center justify-between px-4 py-2'>
          <h1 className='text-xl font-bold'>{titleState}</h1>
          <div className='gap-2 grid grid-flow-col'>
            {Links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setTitleState(link.title)}
                className={cn(
                  buttonVariants({
                    variant: "link",
                  })
                )}
              >
                {link.title}
              </Link>
            ))}

            <Button onClick={onLogout}>Logout</Button>
          </div>
        </div>
        <Separator />
        <div className='h-full mx-auto overflow-auto'>{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
export interface MailProps {
  children: React.ReactNode;
  // defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

type LinksType = {
  href: string;
  title: string;
};

export const Links: LinksType[] = [
  {
    href: "/home",
    title: "Home",
  },
  {
    href: "/about",
    title: "About",
  },
  {
    href: "/contact",
    title: "Contact",
  },
];
