// app/layout.tsx
import { AuthProvider } from "@/app/contexts/AuthContext";
import { SiteProvider } from "@/app/contexts/SiteContext";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<AuthProvider>
					<SiteProvider>{children}</SiteProvider>
				</AuthProvider>
				<Toaster position="top-center" />
			</body>
		</html>
	);
}
