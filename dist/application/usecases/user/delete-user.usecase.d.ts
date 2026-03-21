import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
export declare class DeleteUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: string): Promise<void>;
}
