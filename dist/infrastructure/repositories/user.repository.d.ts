import { Repository } from 'typeorm';
import type { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { User, UserRole } from 'src/domain/entities/user.entity';
import { UserEntity } from '../database/entities/user.entity';
export declare class UserRepository implements IUserRepository {
    private readonly repository;
    constructor(repository: Repository<UserEntity>);
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email?: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByPhone(phone?: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: string, user: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
    findByRole(role: UserRole): Promise<User[]>;
}
