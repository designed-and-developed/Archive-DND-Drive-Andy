import { Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';


@Resolver('File')
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

}
