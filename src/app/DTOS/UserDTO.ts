export interface User {
    name: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    age: number;
    IsDelete: boolean;
    IsActive: boolean;
    LastInsert: Date;
    LastUpdate: Date;
}

export interface login {
    email: string,
    password: string
}