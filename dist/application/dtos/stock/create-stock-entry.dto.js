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
exports.CreateStockEntryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateStockEntryDto {
    productId;
    quantity;
    unitPrice;
}
exports.CreateStockEntryDto = CreateStockEntryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-product-id' }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'ID du produit est requis" }),
    (0, class_validator_1.IsUUID)('4', { message: "L'ID du produit doit être un UUID valide" }),
    __metadata("design:type", String)
], CreateStockEntryDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, minimum: 1 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La quantité est requise' }),
    (0, class_validator_1.IsNumber)({}, { message: 'La quantité doit être un nombre' }),
    (0, class_validator_1.Min)(1, { message: 'La quantité doit être supérieure à 0' }),
    __metadata("design:type", Number)
], CreateStockEntryDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1200, minimum: 0 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le prix unitaire est requis' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Le prix unitaire doit être un nombre' }),
    (0, class_validator_1.Min)(0, { message: 'Le prix unitaire ne peut pas être négatif' }),
    __metadata("design:type", Number)
], CreateStockEntryDto.prototype, "unitPrice", void 0);
//# sourceMappingURL=create-stock-entry.dto.js.map