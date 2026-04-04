"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_controller_1 = require("../../presentation/controllers/auth.controller");
const login_usecase_1 = require("../../application/usecases/auth/login.usecase");
const register_user_usecase_1 = require("../../application/usecases/auth/register-user.usecase");
const refresh_token_usecase_1 = require("../../application/usecases/auth/refresh-token.usecase");
const get_current_user_usecase_1 = require("../../application/usecases/auth/get-current-user.usecase");
const user_repository_1 = require("../repositories/user.repository");
const user_entity_1 = require("../database/entities/user.entity");
const jwt_strategy_1 = require("../services/jwt.strategy");
const jwt_config_1 = require("../config/jwt.config");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: jwt_config_1.getJwtConfig,
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            login_usecase_1.LoginUseCase,
            register_user_usecase_1.RegisterUserUseCase,
            refresh_token_usecase_1.RefreshTokenUseCase,
            get_current_user_usecase_1.GetCurrentUserUseCase,
            {
                provide: 'IUserRepository',
                useClass: user_repository_1.UserRepository,
            },
            jwt_strategy_1.JwtStrategy,
        ],
        exports: ['IUserRepository', jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map