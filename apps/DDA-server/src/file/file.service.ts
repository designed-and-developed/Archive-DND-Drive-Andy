import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";
import { Repository } from "typeorm";
import { CreateFileInput, SuccessResponse } from "../graphql";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async createFile(createFileInput: CreateFileInput): Promise<SuccessResponse> {
    const file = new FileEntity();

    file.fileName = createFileInput.fileName;
    file.ownerName = createFileInput.ownerName;
    file.userId = createFileInput.userId;
    file.awsUrl = createFileInput.awsUrl;
    file.downloadCount = createFileInput.downloadCount;

    if (await this.fileRepository.save(file)) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async findAllFile(): Promise<FileEntity[]> {
    return this.fileRepository.find();
  }
}
