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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_order_item_dto_1 = require("./create-order-item.dto");
class CreateOrderDto {
    customerId;
    items;
    amountPaid;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-customer-id' }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'ID du client est requis" }),
    (0, class_validator_1.IsUUID)('4', { message: "L'ID du client doit être un UUID valide" }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [create_order_item_dto_1.CreateOrderItemDto] }),
    (0, class_validator_1.IsArray)({ message: 'Les articles sont requis' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Au moins un article est requis' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_order_item_dto_1.CreateOrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, minimum: 0.01 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le montant payé est requis' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Le montant payé doit être un nombre' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "amountPaid", void 0);
//# sourceMappingURL=create-order.dto.js.map