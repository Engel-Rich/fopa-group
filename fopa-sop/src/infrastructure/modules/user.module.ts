import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../../presentation/controllers/user.controller';
import { CreateUserUseCase } from '../../application/usecases/user/create-user.usecase';
import { UpdateUserUseCase } from '../../application/usecases/user/update-user.usecase';
import { ListUsersUseCase } from '../../application/usecases/user/list-users.usecase';
import { DeleteUserUseCase } from '../../application/usecases/user/delete-user.usecase';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['IUserRepository'],
})
export class UserModule {}
