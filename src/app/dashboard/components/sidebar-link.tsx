/** @format */
import {
	AlertCircle,
	Archive,
	ArchiveX,
	File,
	Inbox,
	MessagesSquare,
	PenBox,
	Search,
	Send,
	ShoppingCart,
	Trash2,
	Users2,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

type SidebarLinkType = {
	title: string;
	label?: string;
	icon: LucideIcon;
	variant: "default" | "ghost";
};

export const sidebarLink: SidebarLinkType[] = [
	{
		title: "Inbox",
		label: "128",
		icon: Inbox,
		variant: "default",
	},
	{
		title: "Drafts",
		label: "9",
		icon: File,
		variant: "ghost",
	},
	{
		title: "Sent",
		label: "",
		icon: Send,
		variant: "ghost",
	},
	{
		title: "Junk",
		label: "23",
		icon: ArchiveX,
		variant: "ghost",
	},
	{
		title: "Trash",
		label: "",
		icon: Trash2,
		variant: "ghost",
	},
	{
		title: "Archive",
		label: "",
		icon: Archive,
		variant: "ghost",
	},
];
