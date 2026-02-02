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
exports.AddPaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const payment_entity_1 = require("../../../domain/entities/payment.entity");
class AddPaymentDto {
    orderId;
    amount;
    paymentMethod = payment_entity_1.PaymentMethod.CASH;
    reference;
}
exports.AddPaymentDto = AddPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-order-id' }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'ID de la commande est requis" }),
    (0, class_validator_1.IsUUID)('4', { message: "L'ID de la commande doit être un UUID valide" }),
    __metadata("design:type", String)
], AddPaymentDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, minimum: 0.01 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le montant est requis' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Le montant doit être un nombre' }),
    (0, class_validator_1.Min)(0.01, { message: 'Le montant doit être supérieur à 0' }),
    __metadata("design:type", Number)
], AddPaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: payment_entity_1.PaymentMethod, example: payment_entity_1.PaymentMethod.CASH }),
    (0, class_validator_1.IsOptional)({ message: 'Le mode de paiement est requis' }),
    (0, class_validator_1.IsEnum)(payment_entity_1.PaymentMethod, { message: 'Le mode de paiement doit être valide' }),
    __metadata("design:type", Object)
], AddPaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'REF123456',
        required: false,
        description: 'Référence de transaction. Générée automatiquement pour CASH, obligatoire pour les autres modes de paiement',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddPaymentDto.prototype, "reference", void 0);
//# sourceMappingURL=add-payment.dto.js.map