import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {Users} from './users';
import {PrismaModule} from '../prisma/prisma.module';
import {PostsModule} from "../posts/posts.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService, Users],
    imports: [PrismaModule, PostsModule],
    exports: [UsersService, Users],
})
export class UsersModule {
}
