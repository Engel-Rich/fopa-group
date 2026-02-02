import { UserRole } from '../../../domain/entities/user.entity';
export declare class RegisterUserDto {
    email?: string;
    name: string;
    phone: string;
    username: string;
    password: string;
    role: UserRole;
}
