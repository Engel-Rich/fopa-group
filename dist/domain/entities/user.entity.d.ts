export declare enum UserRole {
    ADMIN = "ADMIN",
    CAISSIERE = "CAISSIERE",
    CLIENT = "CLIENT"
}
export declare class User {
    id: string;
    email?: string;
    name: string;
    phone?: string;
    password: string;
    username: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(name: string, password: string, username: string, phone?: string, role?: UserRole, email?: string);
}
