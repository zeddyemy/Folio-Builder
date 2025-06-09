"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { showToast } from "@/lib/utils/toast";
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth";
import { useAuth } from "@/app/contexts/AuthContext";
import { SiteButton } from "@/components/ui/site-button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { login } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const from = searchParams.get("from") || "/sites";
	const hasShownToast = useRef(false);

	useEffect(() => {
		const isRedirect = searchParams.get("redirect") === "true";
		if (isRedirect && !hasShownToast.current) {
			hasShownToast.current = true;
			showToast.error("Please login to continue");
			// Clean up URL parameters without causing a refresh
			const newUrl = new URL(pathname, window.location.origin);
			searchParams.forEach((value, key) => {
				if (key !== "redirect") newUrl.searchParams.set(key, value);
			});
			window.history.replaceState({}, "", newUrl);
		}
	}, [searchParams, pathname]);

	const onSubmit = async (data: LoginFormData) => {
		try {
			await showToast.promise(
				login(data.email, data.password),
				{
					loading: "Logging in...",
					success: "Successfully logged in!",
					error: "Login failed. Please try again.",
				}
			);
			router.push(from);
		} catch (error) {
			// Error already handled by toast.promise
			form.setError("root", {
				type: "manual",
				message: "Invalid email or password",
			});
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						Welcome back
					</CardTitle>
					<CardDescription className="text-center">
						Sign in to your account to continue
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Enter your email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput
												placeholder="Enter your password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{form.formState.errors.root && (
								<div className="text-sm text-destructive">
									{form.formState.errors.root.message}
								</div>
							)}
							<SiteButton
								type="submit"
								className="w-full"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? "Signing in..." : "Sign in"}
							</SiteButton>
						</form>
					</Form>
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Don't have an account?{" "}
							<Link
								href="/signup"
								className="font-medium text-primary hover:underline"
							>
								Sign up
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
