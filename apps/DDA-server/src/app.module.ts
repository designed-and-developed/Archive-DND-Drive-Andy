import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { FileModule } from './file/file.module';
import { TagModule } from './tag/tag.module';
import { FileTagsModule } from './file_tags/file_tags.module';
import { UserEntity } from './user/user.entity';
import { TagEntity } from './tag/tag.entity';
import { FileEntity } from './file/file.entity';
import { FileTagEntity } from './file_tags/file_tag.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'dndDrive',
      entities: [UserEntity, FileEntity, TagEntity, FileTagEntity],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      cors: true,
    }),
    UserModule,
    FileModule,
    TagModule,
    FileTagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
