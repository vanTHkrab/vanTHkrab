import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'},
        })
    ],
})
export class AuthModule {}