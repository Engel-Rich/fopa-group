import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { User } from '../../../domain/entities/user.entity';
import { UserEntity } from '../../database/entities/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    const user = new User(

      entity.name,

      entity.password,
      entity.username,
      entity.phone,
      entity.role,
      entity.email,
    );
    user.id = entity.id;
    user.isActive = entity.isActive;
    user.createdAt = entity.createdAt;
    user.updatedAt = entity.updatedAt;
    return user;
  }

  static toEntity(domain: User): UserEntity {
    const entity = new UserEntity();
    if (domain.id) entity.id = domain.id;
    entity.email = domain.email;
    entity.name = domain.name;
    entity.phone = domain.phone;
    entity.password = domain.password;
    entity.username = domain.username;
    entity.role = domain.role;
    entity.isActive = domain.isActive;
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
    return entity;
  }
  // fromDto to Entity
  static toModelFromDto(dto: CreateUserDto): User {
    return new User(
      dto.name,
      dto.password,
      dto.username,
      dto.phone,
      dto.role,
      dto.email,
    );
  }
}
