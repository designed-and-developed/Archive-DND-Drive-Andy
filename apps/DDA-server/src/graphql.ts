
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

export interface CreateUserInput {
    username: string;
    password: string;
}

export interface UpdateUserInput {
    id: number;
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

type Nullable<T> = T | null;
