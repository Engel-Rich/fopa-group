import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { NotFoundException, AlreadyExistsException } from '../../../shared/exceptions/business.exception';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { UserResponseDto } from '../../dtos/user/user-response.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur');
    }

    const updateData: any = {};

    if (dto.email && dto.email !== user.email) {
      const existingEmail = await this.userRepository.findByEmail(dto.email);
      if (existingEmail) {
        throw new AlreadyExistsException('Un utilisateur avec cet email existe déjà');
      }
      updateData.email = dto.email;
    }

    if (dto.username && dto.username !== user.username) {
      const existingUsername = await this.userRepository.findByUsername(dto.username);
      if (existingUsername) {
        throw new AlreadyExistsException("Un utilisateur avec ce nom d'utilisateur existe déjà");
      }
      updateData.username = dto.username;
    }

    if (dto.phone && dto.phone !== user.phone) {
      const existingPhone = await this.userRepository.findByPhone(dto.phone);
      if (existingPhone) {
        throw new AlreadyExistsException('Un utilisateur avec ce téléphone existe déjà');
      }
      updateData.phone = dto.phone;
    }

    if (dto.name) {
      updateData.name = dto.name;
    }

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.role) {
      updateData.role = dto.role;
    }

    if (dto.isActive !== undefined) {
      updateData.isActive = dto.isActive;
    }

    const updatedUser = await this.userRepository.update(id, updateData);

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      phone: updatedUser.phone,
      username: updatedUser.username,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
}
