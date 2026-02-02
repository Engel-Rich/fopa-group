import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { AuthResponseDto } from '../../dtos/auth/auth-response.dto';
export declare class RegisterUserUseCase {
    private readonly userRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(userRepository: IUserRepository, jwtService: JwtService, configService: ConfigService);
    execute(dto: RegisterUserDto): Promise<AuthResponseDto>;
}
