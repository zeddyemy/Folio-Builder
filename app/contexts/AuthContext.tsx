"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { validateToken, loginUser, logoutUser } from "@/lib/api/auth";

interface User {
	id: string;
	email: string;
	// other user fields
}

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	isLoading: boolean;
	error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER = {
	id: "1",
	email: "dev@example.com",
	name: "Dev User",
	role: "user" as const,
	createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const checkAuth = async () => {
			try {
				// For development, always set mock user
				setUser(MOCK_USER);
				// Comment out actual token check for now
				// const token = localStorage?.getItem("token");
				// if (token) {
				// 	const userData = await validateToken(token);
				// 	setUser(userData);
				// }
			} catch (err) {
				console.warn("Auth check failed:", err);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	// Don't render children until after first mount
	if (!mounted) {
		return null;
	}

	const login = async (email: string, password: string) => {
		try {
			setError(null);
			setIsLoading(true);
			const { user, token } = await loginUser(email, password);
			localStorage.setItem("token", token);
			setUser(user);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		try {
			setIsLoading(true);
			await logoutUser();
			setUser(null);
		} catch (err) {
			console.error("Logout failed:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
