"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const login_usecase_1 = require("../../application/usecases/auth/login.usecase");
const register_user_usecase_1 = require("../../application/usecases/auth/register-user.usecase");
const refresh_token_usecase_1 = require("../../application/usecases/auth/refresh-token.usecase");
const get_current_user_usecase_1 = require("../../application/usecases/auth/get-current-user.usecase");
const login_dto_1 = require("../../application/dtos/auth/login.dto");
const register_user_dto_1 = require("../../application/dtos/auth/register-user.dto");
const refresh_token_dto_1 = require("../../application/dtos/auth/refresh-token.dto");
const auth_response_dto_1 = require("../../application/dtos/auth/auth-response.dto");
const public_decorator_1 = require("../decorators/public.decorator");
const roles_decorator_1 = require("../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const user_entity_1 = require("../../domain/entities/user.entity");
let AuthController = class AuthController {
    loginUseCase;
    registerUserUseCase;
    refreshTokenUseCase;
    getCurrentUserUseCase;
    constructor(loginUseCase, registerUserUseCase, refreshTokenUseCase, getCurrentUserUseCase) {
        this.loginUseCase = loginUseCase;
        this.registerUserUseCase = registerUserUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.getCurrentUserUseCase = getCurrentUserUseCase;
    }
    async login(dto) {
        return this.loginUseCase.execute(dto);
    }
    async refresh(dto) {
        return this.refreshTokenUseCase.execute(dto);
    }
    async register(dto) {
        return this.registerUserUseCase.execute(dto);
    }
    async getCurrentUser(user) {
        return this.getCurrentUserUseCase.execute(user.id);
    }
    async logout() {
        return { message: 'Déconnexion réussie' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Connexion utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Connexion réussie', type: auth_response_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Identifiants invalides' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Rafraîchir le token d\'accès' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tokens rafraîchis', type: auth_response_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Refresh token invalide' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouvel utilisateur (Admin uniquement)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Utilisateur créé avec tokens', type: auth_response_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Utilisateur existe déjà' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir les informations de l\'utilisateur connecté' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Informations utilisateur', type: auth_response_dto_1.UserInfoDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Déconnexion utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Déconnexion réussie' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [login_usecase_1.LoginUseCase,
        register_user_usecase_1.RegisterUserUseCase,
        refresh_token_usecase_1.RefreshTokenUseCase,
        get_current_user_usecase_1.GetCurrentUserUseCase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map