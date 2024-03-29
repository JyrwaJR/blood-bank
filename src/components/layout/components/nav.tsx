/** @format */

"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { cn } from "@/src/lib/utils";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Sheet } from "../../ui/sheet";

interface NavProps {
	isCollapsed: boolean;
	setTitleState: React.Dispatch<React.SetStateAction<string>>;
	titleState: string;
	links: {
		title: string;
		label?: string;
		icon: LucideIcon;
		variant: "default" | "ghost";
		href: string;
	}[];
}

export function Nav({
	links,
	isCollapsed,
	setTitleState,
	titleState = "Profile",
}: NavProps) {
	return (
		<div
			data-collapsed={isCollapsed}
			className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
			<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
				{links.map((link, index) =>
					isCollapsed ? (
						<Tooltip key={index} delayDuration={0}>
							<TooltipTrigger asChild>
								<Link
									key={index}
									href={link.href}
									className={cn(
										buttonVariants({
											variant: link.title === titleState ? "default" : "ghost",
											size: "icon",
										}),
										"dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
									)}
									onClick={() => setTitleState(link.title)}>
									<link.icon className="h-4 w-4" />
									<span className="sr-only ">{link.title}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right" className="flex items-center gap-4">
								{link.title}
								{link.label && (
									<span className="ml-auto  text-muted-foreground">
										{link.label}
									</span>
								)}
							</TooltipContent>
						</Tooltip>
					) : (
						<>
							<Link
								key={index}
								href={link.href}
								// className={cn(
								// 	buttonVariants({ variant: link.variant, size: "sm" }),
								// 	link.variant === "default" &&
								// 		"dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
								// 	"justify-start"
								// )}
								className={cn(
									buttonVariants({
										variant: link.title === titleState ? "default" : "ghost",
										size: "sm",
									}),

									"dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
									"justify-start"
								)}
								onClick={() => setTitleState(link.title)}>
								<link.icon className="mr-2 h-4 w-4" />
								{link.title}
								{link.label && (
									<span
										className={cn(
											"ml-auto",
											link.variant === "default" &&
												"text-background dark:text-white"
										)}>
										{link.label}
									</span>
								)}
							</Link>
						</>
					)
				)}
			</nav>
		</div>
	);
}
