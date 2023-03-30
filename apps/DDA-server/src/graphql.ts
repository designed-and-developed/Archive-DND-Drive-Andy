
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    exampleField?: Nullable<number>;
}

export interface UpdateUserInput {
    id: number;
}

export interface User {
    exampleField?: Nullable<number>;
}

export interface IQuery {
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): Nullable<string> | Promise<Nullable<string>>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<string> | Promise<Nullable<string>>;
}

type Nullable<T> = T | null;
