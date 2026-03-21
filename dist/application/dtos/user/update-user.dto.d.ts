import { UserRole } from '../../../domain/entities/user.entity';
export declare class UpdateUserDto {
    email?: string;
    name?: string;
    phone?: string;
    username?: string;
    password?: string;
    role?: UserRole;
    isActive?: boolean;
}
