import { FileTagEntity } from 'src/file_tags/file_tag.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => FileTagEntity, (fileTag) => fileTag.tag)
  fileTags: FileTagEntity;
}
