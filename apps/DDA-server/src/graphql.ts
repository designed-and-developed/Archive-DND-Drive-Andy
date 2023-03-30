
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateFileInput {
    exampleField?: Nullable<number>;
}

export interface UpdateFileInput {
    id: number;
}

export interface CreateTagInput {
    exampleField?: Nullable<number>;
}

export interface UpdateTagInput {
    id: number;
}

export interface CreateUserInput {
    exampleField?: Nullable<number>;
}

export interface UpdateUserInput {
    id: number;
}

export interface File {
    exampleField?: Nullable<number>;
}

export interface IQuery {
    files(): Nullable<File>[] | Promise<Nullable<File>[]>;
    file(id: number): Nullable<File> | Promise<Nullable<File>>;
    tags(): Nullable<Tag>[] | Promise<Nullable<Tag>[]>;
    tag(id: number): Nullable<Tag> | Promise<Nullable<Tag>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createFile(createFileInput: CreateFileInput): File | Promise<File>;
    updateFile(updateFileInput: UpdateFileInput): File | Promise<File>;
    removeFile(id: number): Nullable<File> | Promise<Nullable<File>>;
    createTag(createTagInput: CreateTagInput): Tag | Promise<Tag>;
    updateTag(updateTagInput: UpdateTagInput): Tag | Promise<Tag>;
    removeTag(id: number): Nullable<Tag> | Promise<Nullable<Tag>>;
    createUser(createUserInput: CreateUserInput): Nullable<string> | Promise<Nullable<string>>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<string> | Promise<Nullable<string>>;
}

export interface Tag {
    exampleField?: Nullable<number>;
}

export interface User {
    exampleField?: Nullable<number>;
}

type Nullable<T> = T | null;
