import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";
import { Repository } from "typeorm";
import {
  CreateFileInput,
  FileResponse,
  FileTag,
  SuccessResponse,
  User,
} from "../graphql";
import { UserEntity } from "../user/user.entity";
import { FileTagEntity } from "../file_tags/file_tag.entity";
import { TagEntity } from "../tag/tag.entity";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(FileTagEntity)
    private fileTagRepository: Repository<FileTagEntity>,
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async createFile(createFileInput: CreateFileInput): Promise<SuccessResponse> {
    let successResp: SuccessResponse = { success: false };

    const owner: User = await this.userRepository.findOne({
      where: { username: createFileInput.ownerName },
    });

    if (!owner) return successResp;

    let file = {
      fileName: createFileInput.fileName,
      ownerName: owner.username,
      awsUrl: createFileInput.awsUrl,
      user: owner,
    };

    const fileEntry = await this.fileRepository.save(file);

    // Create file_tag entries
    if (createFileInput.tagIds) {
      createFileInput.tagIds.forEach(async (tagId) => {
        const tagEntry = await this.tagRepository.findOne({
          where: { id: tagId },
        });
        const file_tag = {
          file: fileEntry,
          tag: tagEntry,
        };
        await this.fileTagRepository.save(file_tag);
      });
    }

    successResp.success = true;

    return successResp;
  }

  async findFiles(tagIds: string[]): Promise<FileResponse[]> {
    if (tagIds && tagIds.length > 0) {
      const fileWithTags = await this.fileRepository
        .createQueryBuilder("file")
        .leftJoinAndSelect("file.fileTags", "ft")
        .where("ft.tagId IN (:...tagIds)", { tagIds })
        .groupBy("file.id")
        .having(`COUNT(DISTINCT ft.tagId) = ${tagIds.length}`)
        .select("file")
        .getMany();

      // Prepare a tagNames string for the frontend
      let tagNames: string[] = [];
      for (let tagId of tagIds) {
        const tag = await this.tagRepository.findOne({
          where: { id: tagId },
        });
        tagNames.push(tag.tagName);
      }

      fileWithTags.forEach((file) => {
        file.tagNames = tagNames.toString();
      });

      return fileWithTags;
    }
    return await this.fileRepository.find();
  }
}
