import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { User, UserRole } from 'src/domain/entities/user.entity';
import { UserEntity } from '../database/entities/user.entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) { }

  async create(user: User): Promise<User> {
    const entity = UserMapper.toEntity(user);
    const saved = await this.repository.save(entity);
    return UserMapper.toDomain(saved);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByEmail(email?: string): Promise<User | null> {
    if (!email) {
      return null;
    }
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { username } });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByPhone(phone?: string): Promise<User | null> {
    if (!phone) {
      return null;
    }
    const entity = await this.repository.findOne({ where: { phone } });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => UserMapper.toDomain(entity));
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.repository.update(id, user);
    const updated = await this.repository.findOne({ where: { id } });
    if (!updated) {
      throw new Error('User not found');
    }
    return UserMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRole(role: UserRole): Promise<User[]> {
    const entities = await this.repository.find({ where: { role } });
    return entities.map((entity) => UserMapper.toDomain(entity));
  }
}
