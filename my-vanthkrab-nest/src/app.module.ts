import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { Posts } from './posts/posts';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PostsModule, PrismaModule, UsersModule],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService, Posts],
})
export class AppModule {}
