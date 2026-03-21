import { UserResponseDto } from '../user/user-response.dto';
export declare class CustomerResponseDto {
    id: string;
    userId: string;
    user?: UserResponseDto;
    address?: string;
    currentDebt: number;
    currentPackagesDebt: number;
    createdAt: Date;
    updatedAt: Date;
}
