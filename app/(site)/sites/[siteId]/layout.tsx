import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteSidebar } from "@/app/components/layout/sites-sidebar";
import { SitesHeader } from "@/app/components/layout/sites-header";

export default function SitesLayout({
	children,
}: Readonly<{
    children: React.ReactNode;
}>) {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			{/* Sidebar */}
			<SiteSidebar variant="inset" />
			<SidebarInset>
				<div className="min-h-screen">
					<SitesHeader />
					<div className="px-4 lg:px-8 py-4 lg:py-6">{children}</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
