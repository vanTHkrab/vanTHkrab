import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(request: { json: () => PromiseLike<{ message: any; }> | { message: any; }; }) {
    try {
        const { message } = await request.json();

        // Create user message in the database
        const userMessage = await prisma.message.create({
            data: {
                sender: 'user',
                content: message,
            },
        });

        // Generate a response (you could integrate with an AI service here)
        const botResponse = `Thank you for your message: "${message}". This is an automated response.`;

        // Create bot message in the database
        const botMessage = await prisma.message.create({
            data: {
                sender: 'bot',
                content: botResponse,
            },
        });

        return NextResponse.json({
            message: botResponse,
            id: botMessage.id
        });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Failed to process message' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const messages = await prisma.message.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}
