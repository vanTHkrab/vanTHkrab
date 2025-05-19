import prisma from "@/lib/prisma";

export function getUser(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            password: true,
        },
    });
}