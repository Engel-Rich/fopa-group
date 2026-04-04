import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
export declare class AdminSeedService implements OnModuleInit {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    onModuleInit(): Promise<void>;
    seedAdmin(): Promise<void>;
}
