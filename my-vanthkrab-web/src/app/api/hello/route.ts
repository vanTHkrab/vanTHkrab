import {NextResponse} from "next/server";

const { NEXT_PUBLIC_NEST_URL, NEXT_PUBLIC_NEST_KEY } = process.env;

export async function GET() {
    if (!NEXT_PUBLIC_NEST_URL) {
        console.error('NEXT_PUBLIC_NEST_URL is not defined');
        return NextResponse.json({ error: 'NEXT_PUBLIC_NEST_URL is not defined' }, { status: 500 });
    }

    try {
        const response = await fetch(`${NEXT_PUBLIC_NEST_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': NEXT_PUBLIC_NEST_KEY || '',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Data received from Nest service:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error connecting to Nest service:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}