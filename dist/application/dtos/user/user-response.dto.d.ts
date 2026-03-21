import { UserRole } from '../../../domain/entities/user.entity';
export declare class UserResponseDto {
    id: string;
    email?: string;
    name: string;
    phone?: string;
    username: string;
    role: UserRole;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
