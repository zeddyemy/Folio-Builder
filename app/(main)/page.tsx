"use client"

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Package, ShoppingCart, Users } from "lucide-react";
import { userSites } from "@/lib/data/sites";

const Overview = () => {
  const router = useRouter();

	// Calculate aggregate stats across all sites
	const totalSites = userSites.length;
	const totalPortfolio = userSites.reduce(
		(sum, site) => sum + site.portfolioCount,
		0
	);
	const totalBlogPosts = userSites.reduce(
		(sum, site) => sum + site.blogCount,
		0
	);
	const totalPages = userSites.reduce(
		(sum, site) => sum + site.pageCount,
		0
	);
	const activeSites = userSites.filter(
		(site) => site.status === "active"
	).length;

	const handleCreateSite = () => {
		router.push("/sites/new");
	};

	const handleViewSites = () => {
		router.push("/sites");
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "text-green-600 bg-green-100";
			case "inactive":
				return "text-red-600 bg-red-100";
			case "draft":
				return "text-yellow-600 bg-yellow-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	return (
		<div className="max-w-7xl mx-auto space-y-8">
			{/* Welcome Section */}
			<div className="text-center space-y-4">
				<h1 className="text-3xl font-bold text-gray-900">
					Welcome back!
				</h1>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Here's an overview of your business performance across all
					your sites.
				</p>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Sites
						</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalSites}</div>
						<p className="text-xs text-muted-foreground">
							{activeSites} active
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Portfolios
						</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{totalPortfolio}
						</div>
						<p className="text-xs text-muted-foreground">
							Across all sites
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Blog Posts
						</CardTitle>
						<ShoppingCart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{totalBlogPosts}
						</div>
						<p className="text-xs text-muted-foreground">
							Across all sites
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Pages
						</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{totalPages.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							Across all sites
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-wrap gap-4">
					<Button
						onClick={handleCreateSite}
						className="flex items-center gap-2"
					>
						<Plus className="h-4 w-4" />
						Create New Site
					</Button>
					<Button onClick={handleViewSites} variant="outline">
						View All Sites
					</Button>
				</CardContent>
			</Card>

			{/* Site Overview */}
			{userSites.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Your Sites</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{userSites.map((site) => (
								<div
									key={site.id}
									className="p-4 border rounded-lg space-y-3"
								>
									<div className="flex items-center gap-3">
										{site.logo ? (
											<img
												src={site.logo}
												alt={site.name}
												className="w-10 h-10 rounded-lg object-cover"
											/>
										) : (
											<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
												{site.name.charAt(0)}
											</div>
										)}
										<div>
											<h3 className="font-semibold">
												{site.name}
											</h3>
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
													site.status
												)}`}
											>
												{site.status
													.charAt(0)
													.toUpperCase() +
													site.status.slice(1)}
											</span>
										</div>
									</div>
									<div className="grid grid-cols-3 gap-2 text-sm">
										<div className="text-center">
											<div className="font-medium">
												{site.portfolioCount}
											</div>
											<div className="text-gray-500">
												Portfolios
											</div>
										</div>
										<div className="text-center">
											<div className="font-medium">
												{site.blogCount}
											</div>
											<div className="text-gray-500">
												Blog Posts
											</div>
										</div>
										<div className="text-center">
											<div className="font-medium">
												{site.pageCount.toLocaleString()}
											</div>
											<div className="text-gray-500">
												Pages
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default Overview;
