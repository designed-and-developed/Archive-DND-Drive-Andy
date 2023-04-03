import { FileTagEntity } from "../file_tags/file_tag.entity";
import { UserEntity } from "../user/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";

@Entity("file")
export class FileEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  userId: number;

  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "NOW()",
  })
  createdAt: Date;

  @Column()
  awsUrl: string;

  @Column()
  downloadCount: number;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  @OneToMany(() => FileTagEntity, (fileTag) => fileTag.file)
  fileTags: FileTagEntity;
}
