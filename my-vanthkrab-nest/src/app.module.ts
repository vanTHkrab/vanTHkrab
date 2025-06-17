import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { Posts } from './posts/posts';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [PostsModule, PrismaModule, UsersModule, BookModule, AuthModule, HealthModule],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService, Posts],
})
export class AppModule {}
