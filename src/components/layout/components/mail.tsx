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
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { Sheet, SheetContent } from "../../ui/sheet";
import { useTheme } from "next-themes";

export function Mail({
	children,
	defaultCollapsed = false,
	navCollapsedSize,
}: MailProps) {
	const { setTheme, resolvedTheme } = useTheme();
	const [isMobileOpen, setIsMobileOpen] = React.useState(false);
	const { user, logout } = useAuthContext();
	const [titleState, setTitleState] = React.useState<string>("Profile");
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
	const onLogout = async () => {
		try {
			await logout();
			
		} catch (error: any) {
			toast({ title: "Something went wrong", description: error.message });
		}
	};
	const acc = {
		label: user?.name ?? "undefined",
		email: user?.email ?? "undefined",
		icon: (
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<title>Vercel</title>
				<path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
			</svg>
		),
	};

	return (
		<ResizablePanelGroup
			direction="horizontal"
			onLayout={(sizes: number[]) => {
				document.cookie = `react-resizable-panels:layout=${JSON.stringify(
					sizes
				)}`;
			}}
			className="h-full max-h-screen  items-stretch">
			<MobileSheet
				title={titleState}
				titleState={setTitleState}
				isCollapsed={isCollapsed}
				open={isMobileOpen}
				onClose={() => setIsMobileOpen(!isMobileOpen)}
			/>

			<div className="hidden sm:block">
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
							"min-w-[50px]  transition-all duration-300 ease-in-out"
					)}>
					<div
						className={cn(
							"flex h-[52px] items-center justify-center",
							isCollapsed ? "h-[52px]" : "px-2"
						)}>
						<AccountSwitcher isCollapsed={isCollapsed} accounts={acc} />
					</div>
					<Separator />

					<Nav
						titleState={titleState}
						setTitleState={setTitleState}
						isCollapsed={isCollapsed}
						links={sidebarLink}
					/>
					<Separator />
					<Nav
						titleState={titleState}
						setTitleState={setTitleState}
						isCollapsed={isCollapsed}
						links={navLink}
					/>
					<Separator />
				</ResizablePanel>
			</div>

			<ResizablePanel defaultSize={440} minSize={30}>
				<div className="flex items-center justify-between px-4 py-2">
					<div className="flex space-x-2 items-center ">
						<Button
							variant={"outline"}
							size={"icon"}
							onClick={() => setIsMobileOpen(!isMobileOpen)}
							className="sm:hidden">
							<MenuIcon />
						</Button>
						<h1 className="text-xl font-bold">{titleState}</h1>
					</div>

					<div className="gap-2 grid grid-flow-col items-center">
						{Links.map((link, index) => (
							<Link
								key={index}
								href={link.href}
								onClick={() => setTitleState(link.title)}
								className={cn(
									buttonVariants({
										variant: "link",
									}),
									"hidden sm:block"
								)}>
								{link.title}
							</Link>
						))}

						<Button
							variant={"ghost"}
							size="icon"
							onClick={() =>
								setTheme(resolvedTheme === "light" ? "dark" : "light")
							}>
							{resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
						</Button>
						<Button onClick={onLogout}>Logout</Button>
					</div>
				</div>
				<Separator />
				<div className="h-full mx-auto overflow-auto">{children}</div>
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

type MobileSheetsProps = {
	open: boolean;
	onClose: () => void;
	title: string;
	titleState: React.Dispatch<React.SetStateAction<string>>;
	isCollapsed: boolean;
};
const MobileSheet = ({
	open,
	onClose,
	titleState,
	isCollapsed,
	title,
}: MobileSheetsProps) => {
	return (
		<Sheet open={open} onOpenChange={onClose}>
			<SheetContent
				side={"left"}
				className="w-[400px] sm:w-[540px] md:hidden block "
				onClick={onClose}>
				<Nav
					titleState={title}
					setTitleState={titleState}
					isCollapsed={isCollapsed}
					links={sidebarLink}
				/>
				<Separator />
				<Nav
					titleState={title}
					setTitleState={titleState}
					isCollapsed={isCollapsed}
					links={navLink}
				/>
			</SheetContent>
		</Sheet>
	);
};
