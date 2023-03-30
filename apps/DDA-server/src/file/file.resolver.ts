import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileService } from './file.service';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';

@Resolver('File')
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation('createFile')
  create(@Args('createFileInput') createFileInput: CreateFileInput) {
    return this.fileService.create(createFileInput);
  }

  @Query('files')
  findAll() {
    return this.fileService.findAll();
  }

  @Query('file')
  findOne(@Args('id') id: number) {
    return this.fileService.findOne(id);
  }

  @Mutation('updateFile')
  update(@Args('updateFileInput') updateFileInput: UpdateFileInput) {
    return this.fileService.update(updateFileInput.id, updateFileInput);
  }

  @Mutation('removeFile')
  remove(@Args('id') id: number) {
    return this.fileService.remove(id);
  }
}
