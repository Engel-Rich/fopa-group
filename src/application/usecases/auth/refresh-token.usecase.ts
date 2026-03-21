import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { AuthResponseDto, UserInfoDto } from '../../dtos/auth/auth-response.dto';
import { RefreshTokenDto } from '../../dtos/auth/refresh-token.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(dto: RefreshTokenDto): Promise<AuthResponseDto> {
    try {
      const refreshSecret =
        this.configService.get<string>('JWT_REFRESH_SECRET') ||
        this.configService.get<string>('JWT_SECRET') ||
        'your-refresh-secret-key';

      // Vérifier et décoder le refresh token
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: refreshSecret,
      });

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Token invalide');
      }

      // Récupérer l'utilisateur
      const user = await this.userRepository.findById(payload.sub);
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Utilisateur introuvable ou désactivé');
      }

      // Générer un nouveau access token
      const newPayload = {
        sub: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      };

      const accessToken = this.jwtService.sign(newPayload);

      // Générer un nouveau refresh token
      const refreshTokenPayload = {
        sub: user.id,
        type: 'refresh',
      };
      const refreshToken = this.jwtService.sign(refreshTokenPayload, {
        secret: refreshSecret,
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
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
    } catch (error) {
      throw new UnauthorizedException('Refresh token invalide ou expiré');
    }
  }
}
