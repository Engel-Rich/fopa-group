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
exports.OrderResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const order_entity_1 = require("../../../domain/entities/order.entity");
const customer_response_dto_1 = require("../customer/customer-response.dto");
const order_item_response_dto_1 = require("./order-item-response.dto");
const payment_response_dto_1 = require("./payment-response.dto");
const user_response_dto_1 = require("../user/user-response.dto");
class OrderResponseDto {
    id;
    orderNumber;
    customerId;
    customer;
    previousDebt;
    subtotal;
    totalAmount;
    amountGiven;
    amountPaid;
    remainingDebt;
    packages;
    packagesReturned;
    remainingPackages;
    status;
    userId;
    createdBy;
    items;
    payments;
    createdAt;
    updatedAt;
}
exports.OrderResponseDto = OrderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "orderNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: customer_response_dto_1.CustomerResponseDto, required: false }),
    __metadata("design:type", customer_response_dto_1.CustomerResponseDto)
], OrderResponseDto.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "previousDebt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "subtotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "amountGiven", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "amountPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "remainingDebt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre d\'emballages (facultatif, défaut 0)' }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "packages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre d\'emballages restitués' }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "packagesReturned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre d\'emballages restants à restituer' }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "remainingPackages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: order_entity_1.OrderStatus }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_response_dto_1.UserResponseDto, required: false }),
    __metadata("design:type", user_response_dto_1.UserResponseDto)
], OrderResponseDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [order_item_response_dto_1.OrderItemResponseDto], required: false }),
    __metadata("design:type", Array)
], OrderResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [payment_response_dto_1.PaymentResponseDto], required: false }),
    __metadata("design:type", Array)
], OrderResponseDto.prototype, "payments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], OrderResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], OrderResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=order-response.dto.js.map