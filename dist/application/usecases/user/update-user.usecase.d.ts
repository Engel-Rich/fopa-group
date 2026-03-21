import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { UserResponseDto } from '../../dtos/user/user-response.dto';
export declare class UpdateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: string, dto: UpdateUserDto): Promise<UserResponseDto>;
}
