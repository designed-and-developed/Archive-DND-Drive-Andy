import { Injectable } from "@nestjs/common";

@Injectable()
export class FileTagsService {
  findAll() {
    return `This action returns all fileTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileTag`;
  }
}
