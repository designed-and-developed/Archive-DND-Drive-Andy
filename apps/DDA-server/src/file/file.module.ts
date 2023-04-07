import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileResolver } from "./file.resolver";
import { FileEntity } from "./file.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), TypeOrmModule.forFeature([UserEntity])],
  providers: [FileResolver, FileService],
  exports: [FileService]
})
export class FileModule {}
