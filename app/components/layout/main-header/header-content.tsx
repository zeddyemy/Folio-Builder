"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { SiteButton } from "@/components/ui/site-button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Store, User, Shield, HelpCircle, LogOut } from "lucide-react";

const HeaderContent = () => {
    const router = useRouter();
	const pathname = usePathname();

	const handleLogout = () => {
		// TODO: Implement actual logout logic

		router.push("/login");
	};

	const isActive = (path: string) => pathname === path;

	return (
		<header className="w-full bg-card border-b border-gray-200">
			<div className="w-site mx-auto">
				<div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-8">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            FolioEngine
                        </Link>

                        {/* Navigation */}
                        <NavigationMenu>
                            <NavigationMenuList className="space-x-6">
                                <NavigationMenuItem>
                                    <Link
                                        href="/"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            isActive("/")
                                                ? "text-primary bg-primary/10"
                                                : "text-gray-700 hover:text-primary"
                                        }`}
                                    >
                                        Overview
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link
                                        href="/sites"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                            isActive("/sites")
                                                ? "text-primary bg-primary/10"
                                                : "text-gray-700 hover:text-primary"
                                        }`}
                                    >
                                        <Store className="h-4 w-4" />
                                        Sites
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-gray-700 hover:text-primary">
                                        <User className="h-4 w-4 mr-2" />
                                        Account
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-48 p-2">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/account"
                                                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                                >
                                                    Profile Settings
                                                </Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/billing"
                                                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                                >
                                                    Billing & Plans
                                                </Link>
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link
                                        href="/security"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                            isActive("/security")
                                                ? "text-primary bg-primary/10"
                                                : "text-gray-700 hover:text-primary"
                                        }`}
                                    >
                                        <Shield className="h-4 w-4" />
                                        Security
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link
                                        href="/support"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                            isActive("/support")
                                                ? "text-primary bg-primary/10"
                                                : "text-gray-700 hover:text-primary"
                                        }`}
                                    >
                                        <HelpCircle className="h-4 w-4" />
                                        Support
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        <SiteButton
                            variant="ghost"
                            onClick={handleLogout}
                            className="flex items-center gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </SiteButton>
                    </div>
                </div>
			</div>
		</header>
	);
}

export default HeaderContent