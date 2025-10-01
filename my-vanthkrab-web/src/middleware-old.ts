// import type {NextRequest} from 'next/server'
// import {NextResponse} from 'next/server'
// import authConfig from "@/auth.config"
// import NextAuth from "next-auth"
//
// const { auth } = NextAuth(authConfig)
//
// export default auth((req) => {
//     // if (!req.auth && req.nextUrl.pathname !== "/login") {
//     //     const newUrl = new URL("/login", req.nextUrl.origin)
//     //     return Response.redirect(newUrl)
//     // }
// })
//
// //
//
// // Middleware to protect routes
// export function middleware(req: NextRequest) {
//     // Check if the user is authenticated
//     const hostname = req.headers.get('host') || ''
// export default function middleware(req: NextRequest) {
//   const url = req.nextUrl
//   const host = req.headers.get('host') || ''
//   const hostname = host.split(':')[0] // กันพอร์ต
//
//   // ถ้าเป็นโดเมนหลัก -> ปล่อยผ่านไปหน้า root
//   if (ROOT_DOMAINS.includes(hostname)) {
//     return NextResponse.rewrite(url)
//   }
//
//   // ดึง subdomain เช่น foo.example.com -> foo
//   const parts = hostname.split('.')
//   const sub = parts.length > 2 ? parts[0] : parts[0] // ปรับตามโครง domain คุณ
//   // NOTE: ถ้าคุณมีหลายชั้น เช่น a.b.example.com ให้กำหนด logic แยก
//
//   // rewrite ไป route ภายใน เช่น /sites/foo + path ที่ตามหลังมา
//   const newPathname = `/sites/${sub}${url.pathname}${url.search}`
//   const rewriteUrl = new URL(newPathname, req.url)
//   return NextResponse.rewrite(rewriteUrl)
// }
//     const subdomain = hostname.split('.')[0]
//
//     if (subdomain === 'admin') {
//         const url = req.nextUrl.clone()
//         url.pathname = `/admin${url.pathname}`
//         return NextResponse.rewrite(url)
//     }
//
//     if (subdomain === 'profile') {
//         const url = req.nextUrl.clone()
//         url.pathname = `/profile${url.pathname}`
//         return NextResponse.rewrite(url)
//     }
//
//     if (subdomain === 'user') {
//         const url = req.nextUrl.clone()
//         url.pathname = `/user${url.pathname}`
//         return NextResponse.rewrite(url)
//     }
//
//     return NextResponse.next()
// }
//
// export const config = {
//     matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// }