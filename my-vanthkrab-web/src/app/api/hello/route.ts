import {NextResponse} from "next/server";
import useNest from "@/hooks/useNest";


export async function GET() {
    try {
        const data = await useNest('/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error connecting to Nest service:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}