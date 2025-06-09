import ProtectedLayout from "../components/layout/protected-layout";

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ProtectedLayout>
			{children}
		</ProtectedLayout>
	);
}
