import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { User } from '../../../domain/entities/user.entity';
import { UserEntity } from '../../database/entities/user.entity';
export declare class UserMapper {
    static toDomain(entity: UserEntity): User;
    static toEntity(domain: User): UserEntity;
    static toModelFromDto(dto: CreateUserDto): User;
}
