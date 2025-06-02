import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @IsOptional()
    @IsInt()
    authorId?: number;
}

