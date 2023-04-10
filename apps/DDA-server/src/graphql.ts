
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateFileInput {
    fileName: string;
    ownerName: string;
    awsUrl: string;
    tagIds?: Nullable<Nullable<string>[]>;
}

export interface CreateTagInput {
    tagName: string;
}

export interface UserInput {
    username: string;
    password: string;
}

export interface File {
    id: string;
    fileName: string;
    ownerName: string;
    createdAt: DateTime;
    downloadCount?: Nullable<number>;
    awsUrl?: Nullable<string>;
    deleted: boolean;
    user?: Nullable<User>;
}

export interface FileResponse {
    id: string;
    fileName: string;
    ownerName: string;
    createdAt: DateTime;
    downloadCount?: Nullable<number>;
    awsUrl?: Nullable<string>;
    tagNames?: Nullable<string>;
}

export interface SuccessResponse {
    success: boolean;
}

export interface IMutation {
    createFile(createFileInput: CreateFileInput): SuccessResponse | Promise<SuccessResponse>;
    updateDownloadCountByFile(fileId: string): SuccessResponse | Promise<SuccessResponse>;
    deleteFile(fileId: string): SuccessResponse | Promise<SuccessResponse>;
    createTag(createTagInput: CreateTagInput): SuccessResponse | Promise<SuccessResponse>;
    createUser(userInput: UserInput): SuccessResponse | Promise<SuccessResponse>;
    login(userInput?: Nullable<UserInput>): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;
}

export interface IQuery {
    findFiles(tagIds?: Nullable<Nullable<string>[]>): Nullable<FileResponse>[] | Promise<Nullable<FileResponse>[]>;
    file(id: string): Nullable<File> | Promise<Nullable<File>>;
    findAllTag(): Nullable<Tag>[] | Promise<Nullable<Tag>[]>;
    tag(id: string): Nullable<Tag> | Promise<Nullable<Tag>>;
    findAllUser(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface FileTag {
    id: string;
    file?: Nullable<File>;
    tag?: Nullable<Tag>;
}

export interface Tag {
    id: string;
    tagName: string;
}

export interface User {
    id: string;
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    username: string;
}

export type DateTime = any;
type Nullable<T> = T | null;
