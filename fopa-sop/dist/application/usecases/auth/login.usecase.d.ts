import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { LoginDto } from '../../dtos/auth/login.dto';
import { AuthResponseDto } from '../../dtos/auth/auth-response.dto';
export declare class LoginUseCase {
    private readonly userRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(userRepository: IUserRepository, jwtService: JwtService, configService: ConfigService);
    execute(dto: LoginDto): Promise<AuthResponseDto>;
}
