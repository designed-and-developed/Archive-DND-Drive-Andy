
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateFileInput {
    fileName: string;
    ownerName: string;
}

export class CreateTagInput {
    tagName: string;
}

export class UserInput {
    username: string;
    password: string;
}

export class File {
    id: string;
    fileName: string;
    ownerName: string;
    createdAt: Date;
    downloadCount?: Nullable<number>;
    awsUrl?: Nullable<string>;
    user?: Nullable<User>;
}

export class FileResponse {
    id: string;
    fileName: string;
    ownerName: string;
    createdAt: Date;
    downloadCount?: Nullable<number>;
    awsUrl?: Nullable<string>;
}

export class SuccessResponse {
    success: boolean;
}

export abstract class IMutation {
    abstract createFile(createFileInput: CreateFileInput): SuccessResponse | Promise<SuccessResponse>;

    abstract createTag(createTagInput: CreateTagInput): SuccessResponse | Promise<SuccessResponse>;

    abstract createUser(userInput: UserInput): SuccessResponse | Promise<SuccessResponse>;

    abstract login(userInput?: Nullable<UserInput>): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;
}

export abstract class IQuery {
    abstract findAllFile(): Nullable<FileResponse>[] | Promise<Nullable<FileResponse>[]>;

    abstract file(id: string): Nullable<File> | Promise<Nullable<File>>;

    abstract findAllTag(): Nullable<Tag>[] | Promise<Nullable<Tag>[]>;

    abstract tag(id: string): Nullable<Tag> | Promise<Nullable<Tag>>;

    abstract findAllUser(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class FileTag {
    id: string;
}

export class Tag {
    id: string;
    tagName: string;
}

export class User {
    id: string;
    username: string;
    password: string;
}

export class LoginResponse {
    access_token: string;
    username: string;
}

type Nullable<T> = T | null;
