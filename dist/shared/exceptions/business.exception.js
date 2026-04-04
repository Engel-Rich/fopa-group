"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidOrderException = exports.ForbiddenException = exports.UnauthorizedException = exports.InvalidCredentialsException = exports.InsufficientStockException = exports.AlreadyExistsException = exports.NotFoundException = exports.BusinessException = void 0;
const common_1 = require("@nestjs/common");
class BusinessException extends common_1.HttpException {
    constructor(message, statusCode = common_1.HttpStatus.BAD_REQUEST) {
        super(message, statusCode);
    }
}
exports.BusinessException = BusinessException;
class NotFoundException extends BusinessException {
    constructor(resource) {
        super(`${resource} introuvable`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
class AlreadyExistsException extends BusinessException {
    constructor(resource) {
        super(`${resource} existe déjà`, common_1.HttpStatus.CONFLICT);
    }
}
exports.AlreadyExistsException = AlreadyExistsException;
class InsufficientStockException extends BusinessException {
    constructor(name, available, requested) {
        super(`Stock insuffisant pour ${name}. Disponible: ${available}, Demandé: ${requested}`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.InsufficientStockException = InsufficientStockException;
class InvalidCredentialsException extends BusinessException {
    constructor() {
        super('Identifiants invalides', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
class UnauthorizedException extends BusinessException {
    constructor(message = 'Non autorisé') {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends BusinessException {
    constructor(message = 'Accès interdit') {
        super(message, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
class InvalidOrderException extends BusinessException {
    constructor(message) {
        super(message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.InvalidOrderException = InvalidOrderException;
//# sourceMappingURL=business.exception.js.map