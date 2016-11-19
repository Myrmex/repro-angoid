/**
 * A generic label/value pair used in viewmodels.
 */
export interface IPair<T> {
    value: T;
    label: string;
}

/**
 * A page of data.
 */
export interface IPagedData<T> {
    total: number;
    items: T[];
}

/**
 * Result for custom validators.
 */
export interface IValidationResult {
 [key: string]: boolean;
}

/**
 * Authenticated user data.
 */
export interface IUser {
    // the id is used to identify the user when communicating with the API server;
    // in our case it is equal to the user name, which is unique.
    id: string;
    email: string;
    // a unique, arbitrarily chosen, user name
    name: string;
    firstName: string;
    lastName: string;
    // in our case users just have a single role, specified here: admin or editor
    role: string;
    verified?: boolean;
}
