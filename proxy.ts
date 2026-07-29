import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from './utils/jwt';
import { cookies } from 'next/headers';


const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PUBLIC_ROUTES = ["/", "/properties", "/contact"];


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies()

    const accessToken = request.cookies.get("accessToken")?.value;

    const decodedToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) : null;

    let userRole = null;

    if (!decodedToken?.success) {

        cookieStore.delete("accessToken")
        return NextResponse.redirect(new URL("/auth/login", request.url))


    }

    if (decodedToken?.success && decodedToken.data) {
        userRole = (decodedToken.data as JwtPayload).role;
    }

    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === 'TENANT') {
            return NextResponse.redirect(new URL('/dashboard/tenant', request.url))
        }
        else if (userRole === 'LANDLORD') {
            return NextResponse.redirect(new URL('/dashboard/landlord', request.url))
        }
        else if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        }
        else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    const isPublic = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"))

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    if (!accessToken && !isPublic && !isAuthRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/not-found", request.url))
    } else if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
        return NextResponse.redirect(new URL("/not-found", request.url))
    } else if (pathname.startsWith("/dashboard/landlord") && userRole !== "LANDLORD") {
        return NextResponse.redirect(new URL("/not-found", request.url))
    }



    return NextResponse.next();


}



export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ]
}