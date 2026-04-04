import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserInfoDto } from '../../dtos/auth/auth-response.dto';
export declare class GetCurrentUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(userId: string): Promise<UserInfoDto>;
}
