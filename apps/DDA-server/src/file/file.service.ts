import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";
import { Repository } from "typeorm";
import { CreateFileInput, FileResponse, SuccessResponse, User } from "../graphql";
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
    let successResp: SuccessResponse = { success: false };

    const owner: User = await this.userRepository.findOne({
      where: { username: createFileInput.ownerName },
    });

    if (!owner) return successResp;

    const file = {
      fileName: createFileInput.fileName,
      ownerName: owner.username,
      awsUrl: "www.amazon.com",
      user: owner,
    };

    const save = await this.fileRepository.save(file);

    if (save) successResp.success = true;

    return successResp;
  }

  async findAllFile(): Promise<FileResponse[]> {
    const fileData = await this.fileRepository.find();

    return fileData;
  }
}
