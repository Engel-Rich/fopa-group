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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_item_entity_1 = require("../database/entities/order-item.entity");
const order_item_mapper_1 = require("./mappers/order-item.mapper");
let OrderItemRepository = class OrderItemRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(item) {
        const entity = order_item_mapper_1.OrderItemMapper.toEntity(item);
        const saved = await this.repository.save(entity);
        return order_item_mapper_1.OrderItemMapper.toDomain(saved);
    }
    async createMany(items) {
        const entities = items.map((item) => order_item_mapper_1.OrderItemMapper.toEntity(item));
        const saved = await this.repository.save(entities);
        return saved.map((entity) => order_item_mapper_1.OrderItemMapper.toDomain(entity));
    }
    async findById(id) {
        const entity = await this.repository.findOne({
            where: { id },
            relations: ['product', 'order'],
        });
        return entity ? order_item_mapper_1.OrderItemMapper.toDomain(entity) : null;
    }
    async findByOrderId(orderId) {
        const entities = await this.repository.find({
            where: { orderId },
            relations: ['product', 'order'],
        });
        return entities.map((entity) => order_item_mapper_1.OrderItemMapper.toDomain(entity));
    }
    async findByProductId(productId) {
        const entities = await this.repository.find({
            where: { productId },
            relations: ['product', 'order'],
        });
        return entities.map((entity) => order_item_mapper_1.OrderItemMapper.toDomain(entity));
    }
    async findAll() {
        const entities = await this.repository.find({
            relations: ['product', 'order'],
        });
        return entities.map((entity) => order_item_mapper_1.OrderItemMapper.toDomain(entity));
    }
    async update(id, item) {
        await this.repository.update(id, item);
        const updated = await this.repository.findOne({
            where: { id },
            relations: ['product', 'order'],
        });
        if (!updated) {
            throw new Error('OrderItem not found');
        }
        return order_item_mapper_1.OrderItemMapper.toDomain(updated);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
};
exports.OrderItemRepository = OrderItemRepository;
exports.OrderItemRepository = OrderItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItemEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderItemRepository);
//# sourceMappingURL=order-item.repository.js.map