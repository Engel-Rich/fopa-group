import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../../presentation/controllers/auth.controller';
import { LoginUseCase } from '../../application/usecases/auth/login.usecase';
import { RegisterUserUseCase } from '../../application/usecases/auth/register-user.usecase';
import { RefreshTokenUseCase } from '../../application/usecases/auth/refresh-token.usecase';
import { GetCurrentUserUseCase } from '../../application/usecases/auth/get-current-user.usecase';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../database/entities/user.entity';
import { JwtStrategy } from '../services/jwt.strategy';
import { getJwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    RegisterUserUseCase,
    RefreshTokenUseCase,
    GetCurrentUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    JwtStrategy,
  ],
  exports: ['IUserRepository', JwtStrategy, PassportModule],
})
export class AuthModule {}
