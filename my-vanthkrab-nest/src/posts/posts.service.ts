import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {Post, Prisma} from '@prisma/client';

// The PostsService is responsible for managing posts in the application.
@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {
    }

    /**
     * Fetch a single post by its unique identifier.
     * @param postWhereUniqueInput - The unique identifier for the post.
     * @returns The post if found, otherwise throws a NotFoundException.
     */
    async post(
        postWhereUniqueInput: Prisma.PostWhereUniqueInput,
    ): Promise<Post | null> {
        const post = await this.prisma.post.findUnique({
            where: postWhereUniqueInput,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${postWhereUniqueInput.id} not found`);
        }

        return post;
    }

    /**
     * Fetch multiple posts with optional pagination, filtering, and sorting.
     * @param params - Parameters for pagination, filtering, and sorting.
     * @returns An array of posts matching the criteria.
     */
    async posts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }): Promise<Post[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.post.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy: orderBy || {id: 'desc'}, // Default ordering
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });
    }

    /**
     * Create a new post with the provided data.
     * @param data - The data for the new post.
     * @returns The created post.
     */
    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        return this.prisma.post.create({
            data,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });
    }

    /**
     * Update an existing post with the provided data.
     * @param params - Parameters containing the unique identifier and data for the post.
     * @returns The updated post.
     */
    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<Post> {
        const {data, where} = params;

        // Check if post exists first
        await this.post(where);

        return this.prisma.post.update({
            data,
            where,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });
    }

    /**
     * Delete a post by its unique identifier.
     * @param where - The unique identifier for the post to be deleted.
     * @returns The deleted post.
     */
    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        // Check if post exists first
        await this.post(where);

        return this.prisma.post.delete({
            where,
        });
    }

    /**
     * Toggle the published status of a post.
     * @param where - The unique identifier for the post to be toggled.
     * @returns The updated post with toggled published status.
     */
    // Additional utility methods
    async getPostsCount(where?: Prisma.PostWhereInput): Promise<number> {
        return this.prisma.post.count({where});
    }

    /**
     * Fetch all published posts.
     */
    async getPublishedPosts(): Promise<Post[]> {
        return this.posts({
            where: {published: true},
        });
    }

    /**
     * Fetch all posts by a specific author.
     * @param authorId - The unique identifier of the author.
     * @returns An array of posts authored by the specified author.
     */
    async getPostsByAuthor(authorId: number): Promise<Post[]> {
        return this.posts({
            where: {authorId},
        });
    }
}