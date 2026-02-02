import { User, UserRole } from '../entities/user.entity';
export interface IUserRepository {
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
