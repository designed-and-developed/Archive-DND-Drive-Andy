import { Module } from '@nestjs/common';
import { FileTagsService } from './file_tags.service';
import { FileTagsResolver } from './file_tags.resolver';

@Module({
  providers: [FileTagsResolver, FileTagsService]
})
export class FileTagsModule {}
