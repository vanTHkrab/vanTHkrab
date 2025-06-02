import {Module} from '@nestjs/common';
import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {Posts} from './posts';
import {PrismaModule} from '../prisma/prisma.module';

/**
 * PostsModule is responsible for managing the posts feature in the application.
 */
@Module({
    providers: [PostsService, Posts], // PostsService handles business logic, Posts is the model
    controllers: [PostsController],
    imports: [PrismaModule],
    exports: [PostsService, Posts] // Exporting for use in other modules
})
export class PostsModule {

}
