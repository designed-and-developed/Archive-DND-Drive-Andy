import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";
import { Repository } from "typeorm";
import { CreateFileInput, FileResponse, SuccessResponse } from "../graphql";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async createFile(createFileInput: CreateFileInput): Promise<SuccessResponse> {
    const owner = await this.userRepository.findOne({
      where: { username: createFileInput.ownerName },
    });

    if (!owner) return { success: false };

    const file = {
      fileName: createFileInput.fileName,
      ownerName: createFileInput.ownerName,
      awsUrl: "www.amazon.com",
      downloadCount: 0,
    };

    const save = await this.fileRepository.save(file);

    if (save) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async findAllFile(): Promise<FileEntity[]> {
    const data = await this.fileRepository.find();

    return data;
  }
}
