import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FileService } from "./file.service";
import { CreateFileInput } from "../graphql";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../user/auth/gql-auth.guard";


@Resolver("File")
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation("createFile")
  async createFile(@Args("createFileInput") createFileInput: CreateFileInput) {
    return await this.fileService.createFile(createFileInput);
  }

  @Query("findAllFile")
  async findAllFile() {
    return await this.fileService.findAllFile();
  }
}
