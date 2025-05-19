import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Analytics} from "@vercel/analytics/next"
import "@/app/globals.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Authenticated App",
    description: "My personal website",
};

export default function Layout({
                                   children,

                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Analytics/>
        {children}
        </body>
        </html>
    );
}
