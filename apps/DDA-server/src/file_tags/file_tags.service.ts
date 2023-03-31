import { Injectable } from '@nestjs/common';
import { CreateFileTagInput } from './dto/create-file_tag.input';
import { UpdateFileTagInput } from './dto/update-file_tag.input';

@Injectable()
export class FileTagsService {
  create(createFileTagInput: CreateFileTagInput) {
    return 'This action adds a new fileTag';
  }

  findAll() {
    return `This action returns all fileTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileTag`;
  }

  update(id: number, updateFileTagInput: UpdateFileTagInput) {
    return `This action updates a #${id} fileTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileTag`;
  }
}
