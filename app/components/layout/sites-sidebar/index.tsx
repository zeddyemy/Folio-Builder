"use client";

import * as React from "react";
import {
	LayoutDashboard,
	Settings,
	FolderOpen,
	Newspaper,
	StickyNote,
	Palette,
} from "lucide-react";

import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { SiteSwitcher } from "./site-switcher";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	sites: [
		{
			name: "Site 1",
			plan: "Pro",
		},
		{
			name: "Site 2",
			plan: "Free",
		},
		{
			name: "Site 3",
			plan: "Enterprise",
		},
	],
	navMain: [
		{
			title: "Dashboard",
			url: "#",
			icon: LayoutDashboard,
		},
	],
	navContents: [
		{
			title: "Portfolios",
			url: "#",
			icon: FolderOpen,
			items: [
				{
					title: "All Portfolios",
					url: "#",
				},
				{
					title: "Add new",
					url: "#",
				},
				{
					title: "Categories",
					url: "#",
				},
			],
		},
		{
			title: "Blog Posts",
			url: "#",
			icon: Newspaper,
			items: [
				{
					title: "All Posts",
					url: "#",
				},
				{
					title: "Add new",
					url: "#",
				},
				{
					title: "Categories",
					url: "#",
				},
			],
		},
		{
			title: "Pages",
			url: "#",
			icon: StickyNote,
			items: [
				{
					title: "All Pages",
					url: "#",
				},
				{
					title: "Add new",
					url: "#",
				},
				{
					title: "Categories",
					url: "#",
				},
			],
		},
	],
	NavUtils: [
		{
			title: "Appearance",
			url: "#",
			icon: Palette,
			items: [
				{
					title: "Themes",
					url: "#",
				},
				{
					title: "Navigation Menus",
					url: "#",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings,
		},
	],
};

export function SiteSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SiteSwitcher sites={data.sites} />
			</SidebarHeader>
			<SidebarContent>
				<NavGroup title="Platform" items={data.navMain} />
				<NavGroup title="Contents" items={data.navContents} />
				<NavGroup title="Utils" items={data.NavUtils} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
