import { NextResponse, NextRequest } from "next/server";
import useNest from "@/hooks/useNest";

interface Props {
    params: { slug?: string | null };
}

export async function GET(request: NextRequest, { params }: Props) {
    const slug = params?.slug;
    let apiUrl = "posts";

    if (slug) {
        apiUrl += `/${slug}`;
    }

    try {
        const data = await useNest(`/${apiUrl}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Data received from Nest service:", data);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error connecting to Nest service:", error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const data = await useNest(
            '/posts',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });
        console.log('Data received from Nest service:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error connecting to Nest service:', error);
        return NextResponse.json({error: error}, {status: 500});
    }
}