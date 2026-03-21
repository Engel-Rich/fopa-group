import { UserRole } from '../../../domain/entities/user.entity';
export declare class CreateUserDto {
    email?: string;
    name: string;
    phone: string;
    username: string;
    password: string;
    role?: UserRole | undefined;
    constructor(name: string, phone: string, username: string, password: string, role: UserRole, email?: string);
}
