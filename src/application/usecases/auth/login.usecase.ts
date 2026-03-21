import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { InvalidCredentialsException } from '../../../shared/exceptions/business.exception';
import { LoginDto } from '../../dtos/auth/login.dto';
import { AuthResponseDto, UserInfoDto } from '../../dtos/auth/auth-response.dto';
import { UserRole } from '../../../domain/entities/user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async execute(dto: LoginDto): Promise<AuthResponseDto> {
    let user = await this.userRepository.findByUsername(dto.username);
    if (!user) {
      user = await this.userRepository.findByEmail(dto.username);
    }
    if (!user) {
      user = await this.userRepository.findByPhone(dto.username);
    }

    if (!user) {
      throw new InvalidCredentialsException();
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Compte désactivé');
    }

    // Seuls ADMIN et CAISSIERE peuvent se connecter
    if (user.role === UserRole.CLIENT) {
      throw new UnauthorizedException('Les clients ne peuvent pas se connecter');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    // Générer le refresh token avec un secret différent et une durée plus longue
    const refreshTokenPayload = {
      sub: user.id,
      type: 'refresh',
    };
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') || this.configService.get<string>('JWT_SECRET') || 'your-refresh-secret-key';
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      secret: refreshSecret,
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '30d',
    });

    const userInfo: UserInfoDto = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
    };

    return {
      accessToken,
      refreshToken,
      user: userInfo,
    };
  }
}
