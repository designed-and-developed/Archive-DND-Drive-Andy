
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateFileInput {
    name: string;
    userId: number;
    awsUrl?: Nullable<string>;
    downloadCount?: Nullable<number>;
}

export interface UpdateFileInput {
    id: number;
}

export interface CreateFileTagInput {
    exampleField?: Nullable<number>;
}

export interface UpdateFileTagInput {
    id: number;
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
    id: number;
    name: string;
    userId: number;
    awsUrl?: Nullable<string>;
    downloadCount?: Nullable<number>;
}

export interface IQuery {
    files(): Nullable<File>[] | Promise<Nullable<File>[]>;
    file(id: number): Nullable<File> | Promise<Nullable<File>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface FileTag {
    exampleField?: Nullable<number>;
}

export interface Tag {
    id: number;
    name: string;
}

export interface User {
    id: number;
    username: string;
    password: string;
}

export interface AuthPayload {
    token: string;
    user: User;
}

export interface IMutation {
    createUser(userInput: UserInput): User | Promise<User>;
    login(userInput?: Nullable<UserInput>): string | Promise<string>;
}

type Nullable<T> = T | null;
