import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { AuthResponseDto } from '../../dtos/auth/auth-response.dto';
import { RefreshTokenDto } from '../../dtos/auth/refresh-token.dto';
export declare class RefreshTokenUseCase {
    private readonly userRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(userRepository: IUserRepository, jwtService: JwtService, configService: ConfigService);
    execute(dto: RefreshTokenDto): Promise<AuthResponseDto>;
}
