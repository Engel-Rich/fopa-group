import { UserRole } from '../../../domain/entities/user.entity';
export declare class UserInfoDto {
    id: string;
    email?: string;
    name: string;
    phone?: string;
    username: string;
    role: UserRole;
    isActive: boolean;
}
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: UserInfoDto;
}
