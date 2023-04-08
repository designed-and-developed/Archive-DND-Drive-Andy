import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TagService } from "./tag.service";

@Resolver("Tag")
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query("findAllTag")
  async findAllTag() {
    return await this.tagService.findAllTag();
  }
}
