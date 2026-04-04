import { HttpException, HttpStatus } from '@nestjs/common';
export declare class BusinessException extends HttpException {
    constructor(message: string, statusCode?: HttpStatus);
}
export declare class NotFoundException extends BusinessException {
    constructor(resource: string);
}
export declare class AlreadyExistsException extends BusinessException {
    constructor(resource: string);
}
export declare class InsufficientStockException extends BusinessException {
    constructor(name: string, available: number, requested: number);
}
export declare class InvalidCredentialsException extends BusinessException {
    constructor();
}
export declare class UnauthorizedException extends BusinessException {
    constructor(message?: string);
}
export declare class ForbiddenException extends BusinessException {
    constructor(message?: string);
}
export declare class InvalidOrderException extends BusinessException {
    constructor(message: string);
}
