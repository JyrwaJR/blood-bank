import { PersonIcon } from "@radix-ui/react-icons";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  HeartPulse,
  Inbox,
  MessagesSquare,
  PenBox,
  PersonStanding,
  Search,
  Send,
  SendToBack,
  ShoppingCart,
  Syringe,
  Thermometer,
  Trash2,
  User,
  Users2,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

type SidebarLinkType = {
  title: string;
  label: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  href: string;
};

export const sidebarLink: SidebarLinkType[] = [
  {
    title: "Profile",
    label: "",
    icon: User,
    variant: "ghost",
    href: "/profile", // Define the URL for Profile
  },
  {
    title: "Request",
    label: "",
    icon: Syringe,
    variant: "ghost",
    href: "/request", // Define the URL for Request
  },
  {
    title: "Donate",
    label: "",
    icon: HeartPulse,
    variant: "ghost",
    href: "/donate", // Define the URL for Donate
  },
  {
    title: "Notification",
    label: "",
    icon: Send,
    variant: "ghost",
    href: "/notification", // Define the URL for Notification
  },
  {
    title: "Customer Support",
    label: "",
    icon: MessagesSquare,
    variant: "ghost",
    href: "/customer-support", // Define the URL for Customer Support
  },
 
];
