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
exports.ReturnPackagesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ReturnPackagesDto {
    customerId;
    quantity;
    notes;
}
exports.ReturnPackagesDto = ReturnPackagesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-customer-id' }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'ID du client est requis" }),
    (0, class_validator_1.IsUUID)('4', { message: "L'ID du client doit être un UUID valide" }),
    __metadata("design:type", String)
], ReturnPackagesDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, minimum: 1, description: "Nombre d'emballages remboursés" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Le nombre d'emballages est requis" }),
    (0, class_validator_1.IsInt)({ message: "Le nombre d'emballages doit être un entier" }),
    (0, class_validator_1.Min)(1, { message: "Le nombre d'emballages doit être supérieur à 0" }),
    __metadata("design:type", Number)
], ReturnPackagesDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Retour du 25/04' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReturnPackagesDto.prototype, "notes", void 0);
//# sourceMappingURL=return-packages.dto.js.map