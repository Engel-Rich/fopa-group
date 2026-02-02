import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUseCase } from '../../application/usecases/auth/login.usecase';
import { RegisterUserUseCase } from '../../application/usecases/auth/register-user.usecase';
import { RefreshTokenUseCase } from '../../application/usecases/auth/refresh-token.usecase';
import { GetCurrentUserUseCase } from '../../application/usecases/auth/get-current-user.usecase';
import { LoginDto } from '../../application/dtos/auth/login.dto';
import { RegisterUserDto } from '../../application/dtos/auth/register-user.dto';
import { RefreshTokenDto } from '../../application/dtos/auth/refresh-token.dto';
import { AuthResponseDto, UserInfoDto } from '../../application/dtos/auth/auth-response.dto';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserRole } from '../../domain/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) { }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiResponse({ status: 200, description: 'Connexion réussie', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(dto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rafraîchir le token d\'accès' })
  @ApiResponse({ status: 200, description: 'Tokens rafraîchis', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Refresh token invalide' })
  async refresh(@Body() dto: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.refreshTokenUseCase.execute(dto);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur (Admin uniquement)' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec tokens', type: AuthResponseDto })
  @ApiResponse({ status: 409, description: 'Utilisateur existe déjà' })
  async register(@Body() dto: RegisterUserDto): Promise<AuthResponseDto> {
    return this.registerUserUseCase.execute(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtenir les informations de l\'utilisateur connecté' })
  @ApiResponse({ status: 200, description: 'Informations utilisateur', type: UserInfoDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async getCurrentUser(@CurrentUser() user: any): Promise<UserInfoDto> {
    return this.getCurrentUserUseCase.execute(user.id);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Déconnexion utilisateur' })
  @ApiResponse({ status: 200, description: 'Déconnexion réussie' })
  async logout(): Promise<{ message: string }> {
    return { message: 'Déconnexion réussie' };
  }
}
