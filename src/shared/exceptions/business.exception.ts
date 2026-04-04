import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, statusCode);
  }
}

export class NotFoundException extends BusinessException {
  constructor(resource: string) {
    super(`${resource} introuvable`, HttpStatus.NOT_FOUND);
  }
}

export class AlreadyExistsException extends BusinessException {
  constructor(resource: string) {
    super(`${resource} existe déjà`, HttpStatus.CONFLICT);
  }
}

export class InsufficientStockException extends BusinessException {
  constructor(name: string, available: number, requested: number) {
    super(
      `Stock insuffisant pour ${name}. Disponible: ${available}, Demandé: ${requested}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InvalidCredentialsException extends BusinessException {
  constructor() {
    super('Identifiants invalides', HttpStatus.UNAUTHORIZED);
  }
}

export class UnauthorizedException extends BusinessException {
  constructor(message: string = 'Non autorisé') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends BusinessException {
  constructor(message: string = 'Accès interdit') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class InvalidOrderException extends BusinessException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
