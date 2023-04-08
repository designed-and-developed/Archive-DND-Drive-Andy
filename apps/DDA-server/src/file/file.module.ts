import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileResolver } from "./file.resolver";
import { FileEntity } from "./file.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/user.entity";
import { FileTagEntity } from "../file_tags/file_tag.entity";
import { TagEntity } from "../tag/tag.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([TagEntity]),
    TypeOrmModule.forFeature([FileTagEntity]),
  ],
  providers: [FileResolver, FileService],
  exports: [FileService],
})
export class FileModule {}
