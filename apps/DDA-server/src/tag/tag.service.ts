import { Injectable } from "@nestjs/common";
import { TagEntity } from "./tag.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag, CreateTagInput } from "../graphql";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async findAllTag(): Promise<Tag[]> {
    const tagData = await this.tagRepository.find();

    return tagData;
  }

  async createTag(createTagInput: CreateTagInput): Promise<Tag> {
    const tag = {
      tagName: createTagInput.tagName
    }
    return await this.tagRepository.save(tag);
  }
}
