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
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../../../domain/entities/order.entity");
const customer_entity_1 = require("./customer.entity");
const user_entity_1 = require("./user.entity");
const order_item_entity_1 = require("./order-item.entity");
const payment_entity_1 = require("./payment.entity");
let OrderEntity = class OrderEntity {
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
    user;
    createdBy;
    createdByUser;
    createdAt;
    updatedAt;
    items;
    payments;
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "orderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], OrderEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.CustomerEntity, (customer) => customer.orders),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    __metadata("design:type", customer_entity_1.CustomerEntity)
], OrderEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "previousDebt", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "amountGiven", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "amountPaid", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "remainingDebt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "packages", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "packagesReturned", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "remainingPackages", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: order_entity_1.OrderStatus,
        default: order_entity_1.OrderStatus.PENDING,
    }),
    __metadata("design:type", String)
], OrderEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], OrderEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.orders),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], OrderEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdBy' }),
    __metadata("design:type", user_entity_1.UserEntity)
], OrderEntity.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItemEntity, (item) => item.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.PaymentEntity, (payment) => payment.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "payments", void 0);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)('orders')
], OrderEntity);
//# sourceMappingURL=order.entity.js.map