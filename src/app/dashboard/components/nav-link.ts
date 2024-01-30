/** @format */ import {
	AlertCircle,
	Archive,
	MessagesSquare,
	ShoppingCart,
	Users2,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

type NavlinkType = {
	title: string;
	label?: string;
	icon: LucideIcon;
	variant: "default" | "ghost";
};

export const navLink: NavlinkType[] = [
	{
		title: "Social",
		label: "972",
		icon: Users2,
		variant: "ghost",
	},
	{
		title: "Updates",
		label: "342",
		icon: AlertCircle,
		variant: "ghost",
	},
	{
		title: "Forums",
		label: "128",
		icon: MessagesSquare,
		variant: "ghost",
	},
	{
		title: "Shopping",
		label: "8",
		icon: ShoppingCart,
		variant: "ghost",
	},
	{
		title: "Promotions",
		label: "21",
		icon: Archive,
		variant: "ghost",
	},
];
