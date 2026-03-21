"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_controller_1 = require("../../presentation/controllers/user.controller");
const create_user_usecase_1 = require("../../application/usecases/user/create-user.usecase");
const update_user_usecase_1 = require("../../application/usecases/user/update-user.usecase");
const list_users_usecase_1 = require("../../application/usecases/user/list-users.usecase");
const delete_user_usecase_1 = require("../../application/usecases/user/delete-user.usecase");
const user_repository_1 = require("../repositories/user.repository");
const user_entity_1 = require("../database/entities/user.entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity])],
        controllers: [user_controller_1.UserController],
        providers: [
            create_user_usecase_1.CreateUserUseCase,
            update_user_usecase_1.UpdateUserUseCase,
            list_users_usecase_1.ListUsersUseCase,
            delete_user_usecase_1.DeleteUserUseCase,
            {
                provide: 'IUserRepository',
                useClass: user_repository_1.UserRepository,
            },
        ],
        exports: ['IUserRepository'],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map