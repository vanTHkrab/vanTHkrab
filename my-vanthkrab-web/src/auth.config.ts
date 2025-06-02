import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { saltAndHashPassword, verifyPassword } from "@/utils/password"
import { ZodError } from "zod"
import { signInSchema } from "@/lib/zod"
import { getUser } from "@/utils/db";


export default {
    providers: [
        GitHub,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            /**
             * @description This function is called when the user submits the sign-in form.
             * It receives the credentials entered by the user and returns a user object if the credentials are valid.
             * If the credentials are invalid, it returns null.
             * @param credentials
             */
            authorize: async (credentials) =>{
                try {
                    const result = await signInSchema.safeParseAsync(credentials);
                    if (!result.success) return null;

                    const {email, password} = result.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    const isValidPassword = await verifyPassword(password, user.password?.toString() ?? "");
                    if (!isValidPassword) return null;

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    };
                }
                catch (error) {
                    if (error instanceof ZodError) {
                        console.error("ZodError:", error.errors);
                    } else {
                        console.error("Error:", error);
                    }
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    callbacks: {
        /**
         * @description This callback is called whenever a session is checked.
         * @param session
         * @param token
         * @param user
         */
        session({session, token, user}) {
            // `session.idToken` is now a valid property, and will be type-checked
            // in places like `useSession().data.user` or `auth().user`
            return {
                ...session,
                user: {
                    ...session.user,
                    address: user.address,
                },
            }
        },
        /**
         * @description This callback is called whenever a JWT is created or updated.
         * @param token
         * @param user
         */
        jwt({token, user}) {
            // `token.idToken` is now a valid property, and will be type-checked
            // in places like `useSession().data.user` or `auth().user`
            if (user) {
                token.idToken = user.idToken
            }
            return token
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    theme: {
        colorScheme: "dark",
        brandColor: "#ff0000",
        logo: "/logo.png",
    },
    debug: process.env.NODE_ENV === "development",
    events: {
        signIn: async (message) => {
            console.log("User signed in:", message)
        },
        signOut: async (message) => {
            console.log("User signed out:", message)
        },
        createUser: async (message) => {
            console.log("User created:", message)
        },
    },
} satisfies NextAuthConfig