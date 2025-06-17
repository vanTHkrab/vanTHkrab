import {Body, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {Logger} from "@nestjs/common";
import {RegisterDto} from "./dto/register.dto";
import {User} from "@prisma/client";
import {JwtPayload} from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUsers({
            where: { email, password }
        });

        if (!user || user.length === 0) {
            return null;
        }

        return user[0];
    }

    async createToken(user: User): Promise<string> {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            username: user.username,
        };

        return this.jwtService.sign(payload);
    }

    async login(user: any): Promise<any> {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(@Body() registerDto: RegisterDto): Promise<any> {
        const existingUser = await this.usersService.getUsers({
            where: { email: registerDto.email }
        });

        if (existingUser && existingUser.length > 0) {
            Logger.warn(`User with email ${registerDto.email} already exists.`);
            throw new Error('User already exists'); // ควรเป็น HttpException ที่เฉพาะเจาะจงกว่านี้
        }

        const newUser = await this.usersService.createUser(registerDto);

        Logger.log(`User with email ${registerDto.email} registered successfully.`);

        return this.login(newUser);
    }
}
