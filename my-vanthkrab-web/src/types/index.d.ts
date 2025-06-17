import React from "react";

declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        /** The user's postal address. */
        address?: string
        /** OpenID ID Token */
        idToken?: string
        role?: "admin" | "user";
    }

    /**
     * The shape of the account object returned in the OAuth providers' `account` callback,
     * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
     */
    interface Account {
        /** The user's postal address. */
        address?: string
        /** OpenID ID Token */
        idToken?: string
    }

    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {
        /** OpenID ID Token */
        idToken?: string
        user: {
            /** The user's postal address. */
            address?: string
        } & DefaultSession["user"]
    }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import {JWT} from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        idToken?: string
    }
}

export interface DefaultSession {
    user: {
        /** The user's postal address. */
        address?: string;
        /** OpenID ID Token */
        idToken?: string;
        role?: "admin" | "user";
    } & DefaultSession["user"];
}

export interface Feature {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    color: string; // Tailwind CSS gradient color class
}

export interface FooterProps {
    delay?: number;
}

export interface SocialLink {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    color: string;
    href?: string;
}

export interface Post {
    id: number
    title: string
    content: string
    published: boolean
    author: User
    authorId: number
}

export interface User {
    id: number
    email: string
    name: string
    password: string
    posts: Post[]
}