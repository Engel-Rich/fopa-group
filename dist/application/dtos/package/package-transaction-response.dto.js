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
exports.PackagesDebtResponseDto = exports.PackageTransactionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const package_transaction_entity_1 = require("../../../domain/entities/package-transaction.entity");
class PackageTransactionResponseDto {
    id;
    customerId;
    type;
    quantity;
    userId;
    notes;
    createdAt;
}
exports.PackageTransactionResponseDto = PackageTransactionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PackageTransactionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PackageTransactionResponseDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: package_transaction_entity_1.PackageTransactionType }),
    __metadata("design:type", String)
], PackageTransactionResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PackageTransactionResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PackageTransactionResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], PackageTransactionResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PackageTransactionResponseDto.prototype, "createdAt", void 0);
class PackagesDebtResponseDto {
    customerId;
    currentPackagesDebt;
}
exports.PackagesDebtResponseDto = PackagesDebtResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PackagesDebtResponseDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PackagesDebtResponseDto.prototype, "currentPackagesDebt", void 0);
//# sourceMappingURL=package-transaction-response.dto.js.map