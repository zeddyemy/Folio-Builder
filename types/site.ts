export interface Site {
	id: string;
	name: string;
	description?: string;
	domain: string;
	customDomain?: string;
	logo?: string;
	status: "active" | "inactive" | "draft";
	createdAt: string;
	updatedAt: string;
	plan: "free" | "basic" | "pro" | "enterprise";
	portfolioCount: number;
	blogCount: number;
	pageCount: number;
}

export interface CreateSiteData {
	name: string;
	description?: string;
	category: string;
} 