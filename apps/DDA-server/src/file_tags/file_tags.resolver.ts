import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileTagsService } from './file_tags.service';
import { CreateFileTagInput } from './dto/create-file_tag.input';
import { UpdateFileTagInput } from './dto/update-file_tag.input';

@Resolver('FileTag')
export class FileTagsResolver {
  constructor(private readonly fileTagsService: FileTagsService) {}

}
