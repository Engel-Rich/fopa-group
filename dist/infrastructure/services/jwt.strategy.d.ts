import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userRepository;
    constructor(configService: ConfigService, userRepository: IUserRepository);
    validate(payload: any): Promise<{
        id: string;
        username: string;
        email: string | undefined;
        role: import("../../domain/entities/user.entity").UserRole;
    }>;
}
export {};
