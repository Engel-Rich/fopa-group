import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { AlreadyExistsException } from '../../../shared/exceptions/business.exception';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { AuthResponseDto, UserInfoDto } from '../../dtos/auth/auth-response.dto';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async execute(dto: RegisterUserDto): Promise<AuthResponseDto> {
    // Vérifier si l'email existe déjà
    const existingEmail = await this.userRepository.findByEmail(dto.email);
    if (existingEmail) {
      throw new AlreadyExistsException('Un utilisateur avec cet email existe déjà');
    }

    // Vérifier si le username existe déjà
    const existingUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUsername) {
      throw new AlreadyExistsException("Un utilisateur avec ce nom d'utilisateur existe déjà");
    }

    // Vérifier si le téléphone existe déjà
    const existingPhone = await this.userRepository.findByPhone(dto.phone);
    if (existingPhone) {
      throw new AlreadyExistsException('Un utilisateur avec ce téléphone existe déjà');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Créer l'utilisateur
    const user = new User(
      dto.name,
      hashedPassword,
      dto.username,
      dto.phone,
      dto.role,
      dto.email,
    );

    const savedUser = await this.userRepository.create(user);

    // Générer les tokens
    const payload = {
      sub: savedUser.id,
      username: savedUser.username,
      role: savedUser.role,
      email: savedUser.email,
    };

    const accessToken = this.jwtService.sign(payload);

    // Générer le refresh token
    const refreshTokenPayload = {
      sub: savedUser.id,
      type: 'refresh',
    };
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') || this.configService.get<string>('JWT_SECRET') || 'your-refresh-secret-key';
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      secret: refreshSecret,
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
    });

    const userInfo: UserInfoDto = {
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      phone: savedUser.phone,
      username: savedUser.username,
      role: savedUser.role,
      isActive: savedUser.isActive,
    };

    return {
      accessToken,
      refreshToken,
      user: userInfo,
    };
  }
}
