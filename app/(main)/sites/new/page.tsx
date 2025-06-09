"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { showToast } from "@/lib/utils/toast";
import { createSiteSchema, type CreateSiteFormData } from "@/lib/schemas/site";
import { useSite } from "@/app/contexts/SiteContext";
import { ArrowLeft } from "lucide-react";
import { SiteButton } from "@/components/ui/site-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function NewSitePage() {
	const form = useForm<CreateSiteFormData>({
		resolver: zodResolver(createSiteSchema),
		defaultValues: {
			name: "",
			description: "",
			category: undefined,
		},
	});

	const router = useRouter();
	const { sites, setSites } = useSite();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (data: CreateSiteFormData) => {
		try {
			setIsSubmitting(true);
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Create new site
			const newSite = {
				id: `site-${sites.length + 1}`,
				name: data.name,
				description: data.description,
				domain: `${data.name.toLowerCase().replace(/\s+/g, "-")}.mysite.com`,
				status: "draft" as const,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				plan: "free" as const,
				portfolioCount: 0,
				blogCount: 0,
				pageCount: 0,
			};

			// Update sites list
			setSites([...sites, newSite]);

			showToast.success("Site created successfully!");
			router.push("/sites");
		} catch (error) {
			showToast.error("Failed to create site. Please try again.");
			console.error("Create site error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-2xl mx-auto">
				<div className="mb-8">
					<SiteButton
						variant="ghost"
						onClick={() => router.push("/sites")}
						className="mb-4 flex items-center gap-2"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Sites
					</SiteButton>

					<h1 className="text-3xl font-bold text-gray-900">
						Create New Site
					</h1>
					<p className="text-gray-600 mt-2">
						Set up your new portfolio site. You can customize it
						further after creation.
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Site Information</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Site Name *</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your site name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Briefly describe your site"
													className="resize-none"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="category"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a category" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="personal">
														Personal
													</SelectItem>
													<SelectItem value="business">
														Business
													</SelectItem>
													<SelectItem value="portfolio">
														Portfolio
													</SelectItem>
													<SelectItem value="blog">
														Blog
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex gap-4 pt-6">
									<SiteButton
										type="button"
										variant="outline"
										className="flex-1"
										onClick={() => router.back()}
									>
										Cancel
									</SiteButton>
									<SiteButton
										type="submit"
										className="flex-1"
										disabled={
											isSubmitting ||
											!form.getValues("name") ||
											!form.getValues("category")
										}
									>
										{isSubmitting
											? "Creating..."
											: "Create Site"}
									</SiteButton>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
