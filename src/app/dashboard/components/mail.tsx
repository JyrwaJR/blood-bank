/** @format */

"use client";
import * as React from "react";

// import { AccountSwitcher } from "@/app/examples/mail/components/account-switcher"
import { cn } from "@/src/lib/utils";
import { Separator } from "@/src/components/ui/separator";
import { Input } from "@/src/components/ui/input";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/components/ui/tabs";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/src/components/ui/resizable";
import { Nav } from "./nav";
import { AccountSwitcher } from "./account-switcher";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { ButtonProps } from "../../../components/ui/button";
import { sidebarLink } from "./sidebar-link";
import { navLink } from "./nav-link";
import Link from "next/link";
import { useAuthContext } from "@/src/context/useAuthContext";
import { toast } from "@/src/components/ui/use-toast";

interface MailProps {
	accounts: {
		label: string;
		email: string;
		icon: React.ReactNode;
	}[];
	// mails: Mail[];
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize: number;
}

type LinksType = {
	href: string;
	title: string;
};

const Links: LinksType[] = [
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

export function Mail({
	accounts,
	// mails,
	defaultLayout = [265, 440, 655],
	defaultCollapsed = false,
	navCollapsedSize,
}: MailProps) {
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
	// const [mail] = useMail();
	const { logout } = useAuthContext();
	const onLogout = async () => {
		try {
			await logout();
		} catch (error: any) {
			toast({ title: "Something went wrong", description: error.message });
		}
	};

	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction="horizontal"
				onLayout={(sizes: number[]) => {
					document.cookie = `react-resizable-panels:layout=${JSON.stringify(
						sizes
					)}`;
				}}
				className="h-full max-h-[800px] items-stretch">
				<ResizablePanel
					defaultSize={defaultLayout[0]}
					collapsedSize={navCollapsedSize}
					collapsible={true}
					minSize={15}
					maxSize={20}
					onCollapse={(collapsed) => {
						setIsCollapsed(collapsed);
						document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
							collapsed
						)}`;
					}}
					className={cn(
						isCollapsed &&
							"min-w-[50px] transition-all duration-300 ease-in-out"
					)}>
					<div
						className={cn(
							"flex h-[52px] items-center justify-center",
							isCollapsed ? "h-[52px]" : "px-2"
						)}>
						<AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
					</div>
					<Separator />
					<Nav isCollapsed={isCollapsed} links={sidebarLink} />
					<Separator />
					<Nav isCollapsed={isCollapsed} links={navLink} />
				</ResizablePanel>
				{/* <ResizableHandle withHandle />   */}
				<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
					<div className="flex items-center justify-between px-4 py-2">
						<h1 className="text-xl font-bold">Inbox</h1>
						<div className="gap-2 grid grid-flow-col">
							{Links.map((link, index) => (
								<Link
									key={index}
									href={link.href}
									className={cn(
										buttonVariants({
											variant: "link",
										})
									)}>
									{link.title}
								</Link>
							))}

							<Button onClick={onLogout}>Logout</Button>
						</div>
					</div>
					<Separator />
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
}
