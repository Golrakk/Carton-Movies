import _user from './user.json';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export const users = _user as User[];