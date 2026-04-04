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
exports.RefreshTokenUseCase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let RefreshTokenUseCase = class RefreshTokenUseCase {
    userRepository;
    jwtService;
    configService;
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async execute(dto) {
        try {
            const refreshSecret = this.configService.get('JWT_REFRESH_SECRET') ||
                this.configService.get('JWT_SECRET') ||
                'your-refresh-secret-key';
            const payload = this.jwtService.verify(dto.refreshToken, {
                secret: refreshSecret,
            });
            if (payload.type !== 'refresh') {
                throw new common_1.UnauthorizedException('Token invalide');
            }
            const user = await this.userRepository.findById(payload.sub);
            if (!user || !user.isActive) {
                throw new common_1.UnauthorizedException('Utilisateur introuvable ou désactivé');
            }
            const newPayload = {
                sub: user.id,
                username: user.username,
                role: user.role,
                email: user.email,
            };
            const accessToken = this.jwtService.sign(newPayload);
            const refreshTokenPayload = {
                sub: user.id,
                type: 'refresh',
            };
            const refreshToken = this.jwtService.sign(refreshTokenPayload, {
                secret: refreshSecret,
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d',
            });
            const userInfo = {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                username: user.username,
                role: user.role,
                isActive: user.isActive,
            };
            return {
                accessToken,
                refreshToken,
                user: userInfo,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Refresh token invalide ou expiré');
        }
    }
};
exports.RefreshTokenUseCase = RefreshTokenUseCase;
exports.RefreshTokenUseCase = RefreshTokenUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        config_1.ConfigService])
], RefreshTokenUseCase);
//# sourceMappingURL=refresh-token.usecase.js.map