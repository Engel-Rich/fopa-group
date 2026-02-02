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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../../domain/entities/user.entity");
class CreateUserDto {
    email;
    name;
    phone;
    username;
    password;
    role = user_entity_1.UserRole.CLIENT;
    constructor(name, phone, username, password, role, email) {
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'user@example.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: "L'email doit être valide" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Doe' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le nom est requis' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+2250123456789' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le téléphone est requis' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jane_doe' }),
    (0, class_validator_1.IsNotEmpty)({ message: "Le nom d'utilisateur est requis" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', minLength: 6 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le mot de passe est requis' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_entity_1.UserRole, example: user_entity_1.UserRole.CAISSIERE }),
    (0, class_validator_1.IsOptional)({ message: 'Le rôle est requis' }),
    (0, class_validator_1.IsEnum)(user_entity_1.UserRole, { message: 'Le rôle doit être ADMIN, CAISSIERE ou CLIENT' }),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "role", void 0);
//# sourceMappingURL=create-user.dto.js.map