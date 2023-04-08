import { FileTagEntity } from "../file_tags/file_tag.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("tag")
export class TagEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tagName: string;

  @OneToMany(() => FileTagEntity, (fileTag) => fileTag.tag)
  fileTags: FileTagEntity;
}
