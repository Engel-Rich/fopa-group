import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserResponseDto } from '../../dtos/user/user-response.dto';
export declare class ListUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(): Promise<UserResponseDto[]>;
}
