import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

/**
 * PostsController is responsible for handling HTTP requests related to posts.
 * It provides endpoints to create, read, update, and delete posts.
 */
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    /**
     * Fetch all posts with optional pagination, filtering, and sorting.
     * @returns An array of PostEntity objects.
     */
    @Get()
    async findAll(): Promise<PostEntity[]> {
        return this.postsService.posts({});
    }

    /**
     * Fetch a single post by its unique identifier.
     * @param id - The unique identifier of the post.
     * @returns A PostEntity object if found, otherwise null.
     */
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity | null> {
        return this.postsService.post({ id });
    }

    /**
     * Create a new post.
     * @param createPostDto - The data transfer object containing post details.
     * @returns The created PostEntity object.
     */
    @Post()
    async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
        return this.postsService.createPost(createPostDto);
    }

    /**
     * Update an existing post by its unique identifier.
     * @param id - The unique identifier of the post to update.
     * @param updatePostDto - The data transfer object containing updated post details.
     * @returns The updated PostEntity object.
     */
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePostDto: UpdatePostDto
    ): Promise<PostEntity> {
        return this.postsService.updatePost({
            where: { id },
            data: updatePostDto,
        });
    }

    /**
     * Delete a post by its unique identifier.
     * @param id - The unique identifier of the post to delete.
     * @returns The deleted PostEntity object.
     */
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
        return this.postsService.deletePost({ id });
    }

    /**
     * Fetch posts by a specific author's unique identifier.
     * @param authorId - The unique identifier of the author.
     * @return An array of PostEntity objects authored by the specified author.
     */
    @Get('author/:authorId')
    async findByAuthor(@Param('authorId', ParseIntPipe) authorId: number): Promise<PostEntity[]> {
        return this.postsService.posts({
            where: { authorId },
        });
    }

    /**
     * Fetch all published posts.
     * @returns An array of PostEntity objects that are published.
     */
    @Get('published/true')
    async findPublished(): Promise<PostEntity[]> {
        return this.postsService.posts({
            where: { published: true },
        });
    }
}