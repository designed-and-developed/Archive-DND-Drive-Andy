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
import { where } from "sequelize";
import { async, of } from "rxjs";

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

  async findFiles(tagIds: string[]): Promise<any[]> {
    let queriedFiles: FileEntity[] = [];

    if (tagIds && tagIds.length > 0) {
      // Returns all files that matches the tagIds, each file only needs to match any one of the tagIds to be returned
      const selectedFiles: FileEntity[] = await this.fileRepository
        .createQueryBuilder("file")
        .leftJoin("file.fileTags", "fft")
        .leftJoin("fft.tag", "fftt")
        .where("fft.tagId IN (:...tagIds)", { tagIds })
        .groupBy("file.id")
        .having(`COUNT(DISTINCT fft.tagId) = ${tagIds.length}`)
        .select("file")
        .getMany();

      queriedFiles = selectedFiles;
    } else {
      queriedFiles = await this.fileRepository.find();
    }

    let responses = [];

    for (let file of queriedFiles) {
      const filetags = await this.fileTagRepository
        .createQueryBuilder("file_tag")
        .leftJoinAndSelect("file_tag.file", "file")
        .leftJoinAndSelect("file_tag.tag", "tag")
        .where("file.id = :id", { id: file.id })
        .getMany();
      const tagNames: string[] = [];
      filetags.forEach((ft) => {
        tagNames.push(ft.tag.tagName);
      });
      const response = { ...file, tagNames: tagNames.toString() };
      responses.push(response);
    }

    return responses;
  }
}
