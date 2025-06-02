import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();
        const {email, password} = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json({error: "Email and password are required"}, {status: 400});
        }

        // Here you would typically create a new user in your database
        // For demonstration, we will just return the email and password
        return NextResponse.json({message: "User registered successfully", email, password}, {status: 201});
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}