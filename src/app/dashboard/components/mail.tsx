/** @format */

"use client";
import * as React from "react";



export interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
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


