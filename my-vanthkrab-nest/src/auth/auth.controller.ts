import {Controller, Post, Body, UseGuards, Request} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {Public} from './decorators/public.decorator';
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req: any, @Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        return this.authService.createToken(user);
    }

    @Public()
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}