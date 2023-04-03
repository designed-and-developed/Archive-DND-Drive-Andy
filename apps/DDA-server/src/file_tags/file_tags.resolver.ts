import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { FileTagsService } from "./file_tags.service";

@Resolver("FileTag")
export class FileTagsResolver {
  constructor(private readonly fileTagsService: FileTagsService) {}
}
