import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserInfoDto } from '../../dtos/auth/auth-response.dto';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(userId: string): Promise<UserInfoDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Compte désactivé');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
