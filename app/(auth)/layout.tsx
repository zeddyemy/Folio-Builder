import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AuthProvider } from "../contexts/AuthContext";
import { SiteProvider } from "../contexts/SiteContext";
import { languages as langs } from "@/constants";
import { Toaster } from "@/components/ui/sonner";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Folio Builder",
	description: "Build stunning portfolio websites.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang={langs[0]}>
			<body className={`${inter.className} antialiased`}>
				<AuthProvider>
					<SiteProvider>
						{children}
					</SiteProvider>
				</AuthProvider>
				<Toaster position="top-center" />
			</body>
		</html>
	);
}
