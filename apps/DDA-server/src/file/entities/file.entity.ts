import { FileTagEntity } from "src/file_tags/entities/file_tag.entity";
import { FileTag } from "src/graphql";
import { TagEntity } from "src/tag/entities/tag.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";

@Entity("file")
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userId: number;

    @CreateDateColumn({
        type: "timestamp with time zone",
        default: () => "NOW()"
    })
    createdAt: Date;

    @Column()
    awsUrl: string;

    @Column()
    downloadCount: number;

    @Column({ default: false })
    deleted: boolean;

    @ManyToOne(() => UserEntity, user => user.files)
    user: UserEntity;

    @OneToMany(() => FileTagEntity, fileTag => fileTag.file)
    fileTags: FileTagEntity;


}

