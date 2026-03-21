import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { AlreadyExistsException } from '../../../shared/exceptions/business.exception';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { UserResponseDto } from '../../dtos/user/user-response.dto';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    const existingEmail = await this.userRepository.findByEmail(dto.email);
    if (existingEmail) {
      throw new AlreadyExistsException('Un utilisateur avec cet email existe déjà');
    }

    const existingUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUsername) {
      throw new AlreadyExistsException("Un utilisateur avec ce nom d'utilisateur existe déjà");
    }

    const existingPhone = await this.userRepository.findByPhone(dto.phone);
    if (existingPhone) {
      throw new AlreadyExistsException('Un utilisateur avec ce téléphone existe déjà');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new User(
      dto.name,
      hashedPassword,
      dto.username,
      dto.phone,
      dto.role,
      dto.email,
    );

    const savedUser = await this.userRepository.create(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      phone: savedUser.phone,
      username: savedUser.username,
      role: savedUser.role,
      isActive: savedUser.isActive,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }
}
