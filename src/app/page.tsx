/** @format */

"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { Button, buttonVariants } from "../components/ui/button";
import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import CustomForm, { CustomFormFieldType } from "../components/custom-form";
import { useForm } from "react-hook-form";
import { LoginModel, LoginModelType } from "../models";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterModel, RegisterModelType } from "../models/register-model";
import { loginFormFields } from "../form/login-form-fields";
import { registerFormFields } from "../form/register-form-fields";
import { toast } from "../components/ui/use-toast";
import axios from "axios";
import { useAuthContext } from "../context/useAuthContext";
export default function AuthenticationPage() {
	const [isLogin, setIsLogin] = React.useState<boolean>(true);
	const { token } = useAuthContext();
	return (
		<div className="h-screen">
			<div className="md:hidden h-auto md:h-full">
				<Image
					src="https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg?w=740&t=st=1706259518~exp=1706260118~hmac=c2f581c76072b27f34c4c2bbe91e081bb316b75586063a60ccf0181903670341"
					width={1280}
					height={843}
					alt="Hospital Building Concept Illustration"
					className="hidden dark:block"
				/>
			</div>
			<div className="container  relative   h-screen md:h-full  flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<Button
					variant={"default"}
					disabled={token ? true : false}
					size={"lg"}
					onClick={() => setIsLogin(!isLogin)}
					className={"absolute right-4 top-4 md:right-8 md:top-8"}>
					{isLogin ? "Sign up" : "Login"}
				</Button>
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
					<div className="absolute inset-0 bg-zinc-900" />
					<div className="relative z-20 flex items-center text-lg font-medium">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-6 w-6">
							<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
						</svg>
						BLOOD BANK MANAGEMENT
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								&ldquo; Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Assumenda saepe mollitia corrupti sit exercitationem vero, iste
								esse iure molestiae recusandae dicta quibusdam, incidunt magni
								quas atque voluptas rem maxime dolor! .&rdquo;
							</p>
							<footer className="text-sm">Lorem Ipsum</footer>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								{isLogin ? "Login to your account" : "Create an account"}
							</h1>
							<p className="text-sm text-muted-foreground">
								{isLogin
									? "Enter your email below to continue to your account."
									: "Please enter the following details"}
							</p>
						</div>
						<UserAuthForm islogin={isLogin} />
						<p className="px-8 text-center text-sm text-muted-foreground">
							By clicking continue, you agree to our{" "}
							<Link
								href="/terms"
								className="underline underline-offset-4 hover:text-primary">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="underline underline-offset-4 hover:text-primary">
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface UserAuthFormProps {
	islogin: boolean;
}
export function UserAuthForm({
	className,
	islogin,
	...props
}: UserAuthFormProps) {
	const { token, isLoading } = useAuthContext();
	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<div className="grid gap-2">
				<div className="grid gap-1">
					{islogin ? (
						<LoginForm isLoading={token ? true : false || isLoading} />
					) : (
						<RegisterForm isLoading={token ? true : false || isLoading} />
					)}
				</div>
			</div>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Link
				target="_blank"
				href={process.env.NEXT_PUBLIC_GITHUB_ADMIN_URL!}
				className={cn(buttonVariants({ variant: "outline" }))}>
				{isLoading ? (
					<div
						className="inline-block mx-2 h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
						role="status">
						<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
							Loading...
						</span>
					</div>
				) : (
					<GitHubLogoIcon className="mr-2 h-4 w-4" />
				)}{" "}
				GitHub
			</Link>
		</div>
	);
}

const LoginForm = ({ isLoading }: { isLoading?: boolean }) => {
	const { login } = useAuthContext();
	const form = useForm<LoginModelType>({
		resolver: zodResolver(LoginModel),
		defaultValues: {},
	});
	const onSubmit = async (data: LoginModelType) => {
		try {
			await login(data);
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Something went wrong",
				description: error.message,
			});
		}
	};
	return (
		<CustomForm
			form={form}
			inputFields={loginFormFields}
			loading={isLoading || false}
			onSubmit={onSubmit}
			className="grid w-full grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-2 md:gap-4"
		/>
	);
};
const RegisterForm = ({ isLoading }: { isLoading?: boolean }) => {
	const { signUp } = useAuthContext();
	const form = useForm<RegisterModelType>({
		resolver: zodResolver(RegisterModel),
		defaultValues: {},
	});

	const onSubmitRegister = async (data: RegisterModelType) => {
		try {
			await signUp(data);
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Something went wrong",
				description: error.message,
			});
		}
	};
	return (
		<CustomForm
			form={form}
			inputFields={registerFormFields}
			className="grid w-full grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-2 md:gap-4"
			loading={isLoading || false}
			onSubmit={onSubmitRegister}
		/>
	);
};
