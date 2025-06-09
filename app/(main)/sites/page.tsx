"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { useSite } from "@/app/contexts/SiteContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteButton } from "@/components/ui/site-button";
import { Plus, Settings, ExternalLink } from "lucide-react";
import { userSites } from "@/lib/data/sites";
import { Site } from "@/types/site";
import { Skeleton } from "@/components/ui/skeleton";

function SiteCardSkeleton() {
	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader className="space-y-4">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<Skeleton className="w-12 h-12 rounded-lg" />
						<div className="space-y-2">
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-4 w-48" />
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Skeleton className="h-6 w-20 rounded-full" />
					<Skeleton className="h-6 w-20 rounded-full" />
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					{[1, 2, 3].map((i) => (
						<div key={i} className="flex justify-between">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-4 w-10" />
						</div>
					))}
				</div>
				<div className="pt-4 space-y-2">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			</CardContent>
		</Card>
	);
}

export default function SitesPage() {
	const router = useRouter();
	const { user } = useAuth();
	const { setCurrentSite, sites, setSites } = useSite();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadSites = async () => {
			try {
				// Simulate API delay
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setSites(userSites);
			} catch (error) {
				console.error("Failed to load sites:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadSites();
	}, [setSites]);

	const handleManageSite = (site: Site) => {
		setCurrentSite(site);
		router.push(`/sites/${site.id}`);
	};

	const handleCreateSite = () => {
		router.push("/sites/new");
	};

	const getStatusColor = (status: Site["status"]) => {
		const colors = {
			active: "text-green-600 bg-green-100",
			inactive: "text-red-600 bg-red-100",
			draft: "text-yellow-600 bg-yellow-100",
		};
		return colors[status];
	};

	const getPlanColor = (plan: Site["plan"]) => {
		const colors = {
			enterprise: "text-purple-600 bg-purple-100",
			pro: "text-blue-600 bg-blue-100",
			basic: "text-orange-600 bg-orange-100",
			free: "text-gray-600 bg-gray-100",
		};
		return colors[plan];
	};

	if (isLoading) {
		return (
			<div className="w-site mx-auto">
				<div className="flex justify-between items-center mb-8">
					<div className="space-y-2">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-64" />
					</div>
					<Skeleton className="h-10 w-40" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3].map((i) => (
						<SiteCardSkeleton key={i} />
					))}
				</div>
			</div>
		);
	}

	if (!sites.length) {
		return (
			<div className="w-site mx-auto">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Your Sites
						</h1>
						<p className="text-gray-600 mt-2">
							Manage all your portfolio sites in one place
						</p>
					</div>
					<SiteButton
						onClick={handleCreateSite}
						className="flex items-center gap-2"
					>
						<Plus className="h-4 w-4" />
						Create New Site
					</SiteButton>
				</div>
				<div className="flex flex-col items-center text-center py-16">
					<div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
						<Plus className="h-12 w-12 text-gray-400" />
					</div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-4">
						No sites yet
					</h2>
					<p className="text-gray-600 mb-8 max-w-md mx-auto">
						Get started by creating your first online site. It only
						takes a few minutes to set up.
					</p>
					<SiteButton
						onClick={handleCreateSite}
						size="lg"
						className="flex items-center gap-2"
					>
						<Plus className="h-5 w-5" />
						Create Your First Site
					</SiteButton>
				</div>
			</div>
		);
	}

	return (
		<div className="w-site mx-auto">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Your Sites
					</h1>
					<p className="text-gray-600 mt-2">
						Manage all your portfolio sites in one place
					</p>
				</div>
				<SiteButton
					onClick={handleCreateSite}
					className="flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					Create New Site
				</SiteButton>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{sites.map((site) => (
					<Card
						key={site.id}
						className="hover:shadow-lg transition-shadow"
					>
						<CardHeader className="space-y-4">
							<div className="flex items-start justify-between">
								<div className="flex items-center gap-3">
									{site.logo ? (
										<img
											src={site.logo}
											alt={site.name}
											className="w-12 h-12 rounded-lg object-cover"
										/>
									) : (
										<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
											{site.name.charAt(0)}
										</div>
									)}
									<div>
										<CardTitle className="text-lg">
											{site.name}
										</CardTitle>
										<p className="text-sm text-gray-600">
											{site.description}
										</p>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<span
									className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
										site.status
									)}`}
								>
									{site.status.charAt(0).toUpperCase() +
										site.status.slice(1)}
								</span>
								<span
									className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(
										site.plan
									)}`}
								>
									{site.plan.charAt(0).toUpperCase() +
										site.plan.slice(1)}
								</span>
							</div>
						</CardHeader>

						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">
										Portfolios:
									</span>
									<span className="font-medium">
										{site.portfolioCount}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">
										Blog Posts:
									</span>
									<span className="font-medium">
										{site.blogCount}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">
										Pages:
									</span>
									<span className="font-medium">
										{site.pageCount}
									</span>
								</div>
							</div>

							<div className="pt-4 space-y-2">
								<SiteButton
									onClick={() => handleManageSite(site)}
									className="w-full"
									variant="default"
								>
									<Settings className="h-4 w-4 mr-2" />
									Manage Site
								</SiteButton>

								<SiteButton
									variant="outline"
									className="w-full"
									onClick={() =>
										window.open(
											`https://${
												site.customDomain || site.domain
											}`,
											"_blank"
										)
									}
								>
									<ExternalLink className="h-4 w-4 mr-2" />
									View Site Front
								</SiteButton>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
