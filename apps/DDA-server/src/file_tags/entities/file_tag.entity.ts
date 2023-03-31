import { TagEntity } from 'src/tag/entities/tag.entity';
import { FileEntity } from 'src/file/entities/file.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("file_tag")
export class FileTagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FileEntity, file => file.fileTags)
    file: FileEntity;

    @ManyToOne(() => TagEntity, tag => tag.fileTags)
    tag: TagEntity;
}
