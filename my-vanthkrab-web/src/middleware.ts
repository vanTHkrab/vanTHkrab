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
    // Check if the user is authenticated
    const hostname = req.headers.get('host') || ''
    const subdomain = hostname.split('.')[0]

    if (subdomain === 'admin') {
        const url = req.nextUrl.clone()
        url.pathname = `/admin${url.pathname}`
        return NextResponse.rewrite(url)
    }

    if (subdomain === 'profile') {
        const url = req.nextUrl.clone()
        url.pathname = `/profile${url.pathname}`
        return NextResponse.rewrite(url)
    }

    if (subdomain === 'user') {
        const url = req.nextUrl.clone()
        url.pathname = `/user${url.pathname}`
        return NextResponse.rewrite(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}