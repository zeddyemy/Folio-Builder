import ProtectedLayout from "../../components/layout/protected-layout";

export default function SitesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ProtectedLayout>{children}</ProtectedLayout>;
}
