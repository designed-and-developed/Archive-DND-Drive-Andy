
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
}

export interface CreateTagInput {
    id: number;
    name: string;
}

export interface UpdateTagInput {
    id: number;
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
    downloadCount: number;
    awsUrl: string;
    user: User;
}

export interface FileResponse {
    id: string;
    fileName: string;
    ownerName: string;
    createdAt: DateTime;
    downloadCount?: Nullable<number>;
    awsUrl?: Nullable<string>;
}

export interface SuccessResponse {
    success: boolean;
}

export interface IMutation {
    createFile(createFileInput: CreateFileInput): SuccessResponse | Promise<SuccessResponse>;
    createUser(userInput: UserInput): SuccessResponse | Promise<SuccessResponse>;
    login(userInput?: Nullable<UserInput>): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;
}

export interface IQuery {
    findAllFile(): Nullable<FileResponse>[] | Promise<Nullable<FileResponse>[]>;
    file(id: string): Nullable<File> | Promise<Nullable<File>>;
    findAllUser(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface FileTag {
    id: string;
}

export interface Tag {
    id: string;
    name: string;
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
