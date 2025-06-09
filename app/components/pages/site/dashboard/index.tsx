"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/app/contexts/SiteContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteButton } from "@/components/ui/site-button";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/lib/utils/toast";


const SiteDashboard = ({
	siteId,
}: {
	siteId: string;
}) => {
	const router = useRouter();
	const { currentSite, sites, isLoading, setCurrentSite } = useSite();
	const [dashboardLoading, setDashboardLoading] = useState(true);

	useEffect(() => {
		if (!isLoading) {
			const site = sites.find((s) => s.id === siteId);
			if (site) {
				setCurrentSite(site);
				setDashboardLoading(false);
			} else {
				console.error(`Site not found: ${siteId}`);
				router.push("/sites");
			}
		}
	}, [siteId, sites, isLoading, setCurrentSite, router]);

	if (isLoading || dashboardLoading) {
		return <DashboardSkeleton />;
	}

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							{currentSite?.name}
						</h1>
						<p className="text-gray-600 mt-2">
							Manage your site content and settings
						</p>
					</div>
					<SiteButton
						variant="outline"
						onClick={() =>
							window.open(
								`https://${
									currentSite?.customDomain ||
									currentSite?.domain
								}`,
								"_blank"
							)
						}
					>
						<ExternalLink className="h-4 w-4 mr-2" />
						View Site
					</SiteButton>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Pages</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-bold">
								{currentSite?.pageCount}
							</p>
							<p className="text-gray-600">Total pages</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Portfolios</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-bold">
								{currentSite?.portfolioCount}
							</p>
							<p className="text-gray-600">Total portfolios</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Blog Posts</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-bold">
								{currentSite?.blogCount}
							</p>
							<p className="text-gray-600">Total posts</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default SiteDashboard;


export function DashboardSkeleton() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="flex">
				{/* Sidebar Skeleton */}
				<div className="w-64 h-screen bg-white border-r p-4">
					<div className="space-y-4">
						<Skeleton className="h-8 w-32" />
						{[1, 2, 3, 4].map((i) => (
							<Skeleton key={i} className="h-10 w-full" />
						))}
					</div>
				</div>

				{/* Main Content Skeleton */}
				<div className="flex-1 p-8">
					<div className="space-y-6">
						<Skeleton className="h-8 w-48" />
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3].map((i) => (
								<Skeleton key={i} className="h-32 w-full" />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}