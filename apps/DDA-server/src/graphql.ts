
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateFileInput {
    name: string;
    userId: string;
    awsUrl?: Nullable<string>;
    downloadCount?: Nullable<number>;
}

export interface UpdateFileInput {
    id: string;
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
    name: string;
    userId: string;
    awsUrl?: Nullable<string>;
    downloadCount?: Nullable<number>;
}

export interface IQuery {
    files(): Nullable<File>[] | Promise<Nullable<File>[]>;
    file(id: string): Nullable<File> | Promise<Nullable<File>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
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
    user: User;
}

export interface IMutation {
    createUser(userInput: UserInput): User | Promise<User>;
    login(userInput?: Nullable<UserInput>): LoginResponse | Promise<LoginResponse>;
}

type Nullable<T> = T | null;
