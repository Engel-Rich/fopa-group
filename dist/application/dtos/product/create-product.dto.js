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
exports.CreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductDto {
    name;
    categoryId;
    quantity;
    price;
    description;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Coca Cola 1.5L' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le nom du produit est requis' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-category-id' }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'ID de la catégorie est requis" }),
    (0, class_validator_1.IsUUID)('4', { message: "L'ID de la catégorie doit être un UUID valide" }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, minimum: 0 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La quantité est requise' }),
    (0, class_validator_1.IsNumber)({}, { message: 'La quantité doit être un nombre' }),
    (0, class_validator_1.Min)(0, { message: 'La quantité ne peut pas être négative' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500, minimum: 0 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le prix est requis' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Le prix doit être un nombre' }),
    (0, class_validator_1.Min)(0, { message: 'Le prix ne peut pas être négatif' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
//# sourceMappingURL=create-product.dto.js.map