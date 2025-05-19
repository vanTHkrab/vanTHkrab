import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import authConfig from "@/auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    // if (!req.auth && req.nextUrl.pathname !== "/login") {
    //     const newUrl = new URL("/login", req.nextUrl.origin)
    //     return Response.redirect(newUrl)
    // }
})

// Middleware to protect routes
export function middleware(req: NextRequest) {
    // // Check if the user is authenticated
    // const isAuthenticated = req.cookies.get("next-auth.session-token") || req.cookies.get("next-auth.csrf-token")
    //
    // console.log(isAuthenticated)
    //
    // // If the user is not authenticated and trying to access a protected route, redirect to login
    // if (!isAuthenticated && !req.nextUrl.pathname.startsWith("/login")) {
    //     const loginUrl = new URL("/login", req.url)
    //     return NextResponse.redirect(loginUrl)
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}