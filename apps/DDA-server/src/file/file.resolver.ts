import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FileService } from "./file.service";
import { CreateFileInput } from "../graphql";

@Resolver("File")
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation("createFile")
  async createFile(@Args("createFileInput") createFileInput: CreateFileInput) {
    return await this.fileService.createFile(createFileInput);
  }

  @Query("findFiles")
  async findFiles(@Args("tagIds") tagIds: string[]) {
    return await this.fileService.findFiles(tagIds);
  }

  @Mutation("updateDownloadCountByFile")
  async updateDownloadCountByFile(@Args("fileId") fileId: string) {
    return await this.fileService.updateDownloadCountByFile(fileId);
  }
}
