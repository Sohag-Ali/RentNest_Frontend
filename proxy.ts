import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";


const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PUBLIC_ROUTES = ["/", "/properties", "/contact"];


// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname;

    const accessToken = request.cookies.get("accessToken")?.value;

    const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null;

    let userRole = null;

    if(decodedToken){
        userRole = decodedToken.role ;
    }

    if(accessToken && AUTH_ROUTES.includes(pathname)){
        if(userRole === 'TENANT'){
            return NextResponse.redirect(new URL('/dashboard/tenant', request.url))
        }
        else if(userRole === 'LANDLORD'){
            return NextResponse.redirect(new URL('/dashboard/landlord', request.url))
        }
        else if(userRole === 'ADMIN'){
            return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        }
        else{
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    
}
 

 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ]
}