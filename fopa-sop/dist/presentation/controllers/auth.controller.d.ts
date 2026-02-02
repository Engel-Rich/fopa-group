import { LoginUseCase } from '../../application/usecases/auth/login.usecase';
import { RegisterUserUseCase } from '../../application/usecases/auth/register-user.usecase';
import { RefreshTokenUseCase } from '../../application/usecases/auth/refresh-token.usecase';
import { GetCurrentUserUseCase } from '../../application/usecases/auth/get-current-user.usecase';
import { LoginDto } from '../../application/dtos/auth/login.dto';
import { RegisterUserDto } from '../../application/dtos/auth/register-user.dto';
import { RefreshTokenDto } from '../../application/dtos/auth/refresh-token.dto';
import { AuthResponseDto, UserInfoDto } from '../../application/dtos/auth/auth-response.dto';
export declare class AuthController {
    private readonly loginUseCase;
    private readonly registerUserUseCase;
    private readonly refreshTokenUseCase;
    private readonly getCurrentUserUseCase;
    constructor(loginUseCase: LoginUseCase, registerUserUseCase: RegisterUserUseCase, refreshTokenUseCase: RefreshTokenUseCase, getCurrentUserUseCase: GetCurrentUserUseCase);
    login(dto: LoginDto): Promise<AuthResponseDto>;
    refresh(dto: RefreshTokenDto): Promise<AuthResponseDto>;
    register(dto: RegisterUserDto): Promise<AuthResponseDto>;
    getCurrentUser(user: any): Promise<UserInfoDto>;
    logout(): Promise<{
        message: string;
    }>;
}
