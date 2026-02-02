import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { UserResponseDto } from '../../dtos/user/user-response.dto';
export declare class CreateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(dto: CreateUserDto): Promise<UserResponseDto>;
}
