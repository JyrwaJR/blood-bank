/** @format */ import {
  AlertCircle,
  Archive,
  Asterisk,
  LockKeyhole,
  MessagesSquare,
  Settings,
  ShoppingCart,
  Thermometer,
  Users2,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

type NavlinkType = {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  onClick?: () => void;
  href: string;
};

export const navLink: NavlinkType[] = [
  {
    title: "Change Password",
    label: "",
    icon: LockKeyhole,
    variant: "ghost",
    href: "#change-password", // Define the URL for Change Password
  },
  {
    title: "Theme",
    label: "",
    icon: Thermometer,
    variant: "ghost",
    href: "/theme", // Define the URL for Theme
  },
  {
    title: "Settings",
    label: "",
    icon: Settings,
    variant: "ghost",
    href: "/settings", // Define the URL for Settings
  },
];