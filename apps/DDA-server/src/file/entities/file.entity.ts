import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userId: number;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column()
    awsUrl: string;

    @Column()
    downloadCount: number;

    @Column({ default: false })
    deleted: boolean;

    @ManyToOne(() => User, user => user.files)
    user: User;
}

