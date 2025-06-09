import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup", "/", "/api/auth"];
const AUTH_PATHS = ["/sites", "/dashboard"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("token");

	// Allow public paths
	if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
		return NextResponse.next();
	}

	// Check if path requires authentication
	if (AUTH_PATHS.some((path) => pathname.startsWith(path))) {
		if (!token) {
			const loginUrl = new URL("/login", request.url);
			loginUrl.searchParams.set("from", pathname);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all paths except:
		 * 1. /api/auth (authentication endpoints)
		 * 2. /_next (Next.js internals)
		 * 3. /_static (static files)
		 * 4. /_vercel (Vercel internals)
		 * 5. /favicon.ico, /sitemap.xml (static files)
		 */
		"/((?!api/auth|_next|_static|_vercel|favicon.ico|sitemap.xml).*)",
	],
};
