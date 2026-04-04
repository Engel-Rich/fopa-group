"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtRefreshConfig = exports.getJwtConfig = void 0;
const getJwtConfig = (configService) => ({
    secret: configService.get('JWT_SECRET') || 'your-secret-key-change-in-production',
    signOptions: {
        expiresIn: configService.get('JWT_EXPIRES_IN') || '15m',
    },
});
exports.getJwtConfig = getJwtConfig;
const getJwtRefreshConfig = (configService) => ({
    secret: configService.get('JWT_REFRESH_SECRET') || configService.get('JWT_SECRET') || 'your-refresh-secret-key-change-in-production',
    signOptions: {
        expiresIn: configService.get('JWT_REFRESH_EXPIRES_IN') || '7d',
    },
});
exports.getJwtRefreshConfig = getJwtRefreshConfig;
//# sourceMappingURL=jwt.config.js.map