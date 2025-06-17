import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    firstName?: string;

    @IsString()
    lastName?: string;

    @IsString()
    @Transform(({ value }) => value || Role.USER) // Default to USER role if not provided
    role?: Role;
}