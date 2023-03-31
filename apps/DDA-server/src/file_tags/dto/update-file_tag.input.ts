import { CreateFileTagInput } from './create-file_tag.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFileTagInput extends PartialType(CreateFileTagInput) {
  id: number;
}
