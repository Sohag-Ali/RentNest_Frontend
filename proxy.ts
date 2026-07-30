import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './service/getRefreshToken';


const AUTH_ROUTES = ["/auth/login", "/auth/register"];

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = accessToken
        ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
        : null;

    const decodedRefreshToken = refreshToken
        ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string)
        : null;

    let newAccessTokenSet = false;
    let newAccessTokenValue = "";

    // If access token is expired or invalid, but refresh token is valid -> generate new access token
    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken();

        if (result.success && result?.data?.accessToken) {
            newAccessTokenValue = result.data.accessToken;
            accessToken = newAccessTokenValue;
            decodedAccessToken = jwtUtils.verifyToken(newAccessTokenValue, process.env.JWT_ACCESS_SECRET as string);
            newAccessTokenSet = true;
        }
    }

    let userRole: string | null = null;
    if (decodedAccessToken?.success && decodedAccessToken.data) {
        const payload = decodedAccessToken.data as JwtPayload;
        userRole = (payload.role as string)?.toUpperCase() || null;
    }

    // Helper to return NextResponse and attach newly generated accessToken cookie if refreshed
    const createResponse = (redirectUrl?: string) => {
        const response = redirectUrl
            ? NextResponse.redirect(new URL(redirectUrl, request.url))
            : NextResponse.next();

        if (newAccessTokenSet && newAccessTokenValue) {
            response.cookies.set("accessToken", newAccessTokenValue, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24,
                path: "/",
            });
        }
        return response;
    };

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // 1. Logged-in user trying to access Auth routes (/auth/login, /auth/register)
    if (accessToken && decodedAccessToken?.success && isAuthRoute) {
        if (userRole === 'TENANT') {
            return createResponse('/dashboard/tenant');
        } else if (userRole === 'LANDLORD') {
            return createResponse('/dashboard/landlord');
        } else if (userRole === 'ADMIN') {
            return createResponse('/dashboard/admin');
        } else {
            return createResponse('/');
        }
    }

    // 2. Unauthenticated user trying to access Protected Dashboard routes
    if (!decodedAccessToken?.success && isDashboardRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // 3. Authenticated user accessing Dashboard routes
    if (decodedAccessToken?.success && isDashboardRoute) {
        // If visiting root /dashboard -> redirect to their role dashboard
        if (pathname === "/dashboard" || pathname === "/dashboard/") {
            if (userRole === 'TENANT') return createResponse('/dashboard/tenant');
            if (userRole === 'LANDLORD') return createResponse('/dashboard/landlord');
            if (userRole === 'ADMIN') return createResponse('/dashboard/admin');
        }

        // Role-based protection: check if user role matches path
        if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
            return createResponse('/');
        }
        if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
            return createResponse('/');
        }
        if (pathname.startsWith("/dashboard/landlord") && userRole !== "LANDLORD") {
            return createResponse('/');
        }
    }

    return createResponse();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ]
}