"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Site } from "@/types/site";

import { userSites } from "@/lib/data/sites";

interface SiteContextType {
	currentSite: Site | null;
	setCurrentSite: (site: Site | null) => void;
	sites: Site[];
	setSites: (sites: Site[]) => void;
	isLoading: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const useSite = () => {
	const context = useContext(SiteContext);
	if (!context) {
		throw new Error("useSite must be used within a SiteProvider");
	}
	return context;
};

interface SiteProviderProps {
	children: ReactNode;
}

export const SiteProvider: React.FC<SiteProviderProps> = ({ children }) => {
	const [currentSite, setCurrentSite] = useState<Site | null>(null);
	const [sites, setSites] = useState<Site[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Load sites on mount
	useEffect(() => {
		const loadSites = async () => {
			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setSites(userSites); // Replace with actual API call
			} catch (error) {
				console.error("Failed to load sites", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadSites();
	}, []);

	return (
		<SiteContext.Provider
			value={{ currentSite, setCurrentSite, sites, setSites, isLoading }}
		>
			{children}
		</SiteContext.Provider>
	);
};
