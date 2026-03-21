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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../../domain/entities/user.entity");
class RegisterUserDto {
    email;
    name;
    phone;
    username;
    password;
    role;
}
exports.RegisterUserDto = RegisterUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'admin@example.com' }),
    (0, class_validator_1.IsOptional)({ message: "L'email est requis" }),
    (0, class_validator_1.IsEmail)({}, { message: "L'email doit être valide" }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le nom est requis' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+2250123456789' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le téléphone est requis' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin' }),
    (0, class_validator_1.IsNotEmpty)({ message: "Le nom d'utilisateur est requis" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', minLength: 6 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le mot de passe est requis' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_entity_1.UserRole, example: user_entity_1.UserRole.ADMIN }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le rôle est requis' }),
    (0, class_validator_1.IsEnum)(user_entity_1.UserRole, { message: 'Le rôle doit être ADMIN, CAISSIERE ou CLIENT' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "role", void 0);
//# sourceMappingURL=register-user.dto.js.map