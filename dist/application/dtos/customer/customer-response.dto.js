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
exports.CustomerResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_response_dto_1 = require("../user/user-response.dto");
class CustomerResponseDto {
    id;
    userId;
    user;
    address;
    currentDebt;
    currentPackagesDebt;
    createdAt;
    updatedAt;
}
exports.CustomerResponseDto = CustomerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_response_dto_1.UserResponseDto }),
    __metadata("design:type", user_response_dto_1.UserResponseDto)
], CustomerResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CustomerResponseDto.prototype, "currentDebt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dette d\'emballages (nombre restant à restituer)' }),
    __metadata("design:type", Number)
], CustomerResponseDto.prototype, "currentPackagesDebt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CustomerResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CustomerResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=customer-response.dto.js.map