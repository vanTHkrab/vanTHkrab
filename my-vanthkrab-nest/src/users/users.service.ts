import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy: orderBy || { id: 'desc' },
            include: {
                posts: true,
            },
        });
    }

    async getUserById(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: {
                posts: true,
            },
        });

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                posts: true,
            },
        });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return user;
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
            include: {
                posts: true,
            },
        });
    }

    async deleteUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
        const user = await this.getUserById(userWhereUniqueInput);
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return this.prisma.user.delete({
            where: userWhereUniqueInput,
            include: {
                posts: true,
            },
        });
    }
}