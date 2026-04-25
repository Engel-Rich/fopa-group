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
exports.PackageTransactionEntity = void 0;
const typeorm_1 = require("typeorm");
const package_transaction_entity_1 = require("../../../domain/entities/package-transaction.entity");
const customer_entity_1 = require("./customer.entity");
const user_entity_1 = require("./user.entity");
let PackageTransactionEntity = class PackageTransactionEntity {
    id;
    customerId;
    customer;
    type;
    quantity;
    userId;
    user;
    notes;
    createdAt;
};
exports.PackageTransactionEntity = PackageTransactionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PackageTransactionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PackageTransactionEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.CustomerEntity, { eager: false, nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    __metadata("design:type", customer_entity_1.CustomerEntity)
], PackageTransactionEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: package_transaction_entity_1.PackageTransactionType }),
    __metadata("design:type", String)
], PackageTransactionEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], PackageTransactionEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PackageTransactionEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { eager: true, nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], PackageTransactionEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], PackageTransactionEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PackageTransactionEntity.prototype, "createdAt", void 0);
exports.PackageTransactionEntity = PackageTransactionEntity = __decorate([
    (0, typeorm_1.Entity)('package_transactions')
], PackageTransactionEntity);
//# sourceMappingURL=package-transaction.entity.js.map