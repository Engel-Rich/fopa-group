import { CreateUserUseCase } from '../../application/usecases/user/create-user.usecase';
import { UpdateUserUseCase } from '../../application/usecases/user/update-user.usecase';
import { ListUsersUseCase } from '../../application/usecases/user/list-users.usecase';
import { DeleteUserUseCase } from '../../application/usecases/user/delete-user.usecase';
import { CreateUserDto } from '../../application/dtos/user/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/user/update-user.dto';
import { UserResponseDto } from '../../application/dtos/user/user-response.dto';
export declare class UserController {
    private readonly createUserUseCase;
    private readonly updateUserUseCase;
    private readonly listUsersUseCase;
    private readonly deleteUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase, updateUserUseCase: UpdateUserUseCase, listUsersUseCase: ListUsersUseCase, deleteUserUseCase: DeleteUserUseCase);
    create(dto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    update(id: string, dto: UpdateUserDto): Promise<UserResponseDto>;
    delete(id: string): Promise<void>;
}
