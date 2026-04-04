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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../database/entities/product.entity");
const product_mapper_1 = require("./mappers/product.mapper");
let ProductRepository = class ProductRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(product) {
        const entity = product_mapper_1.ProductMapper.toEntity(product);
        const saved = await this.repository.save(entity);
        return product_mapper_1.ProductMapper.toDomain(saved);
    }
    async findById(id) {
        const entity = await this.repository.findOne({
            where: { id },
            relations: ['category'],
        });
        return entity ? product_mapper_1.ProductMapper.toDomain(entity) : null;
    }
    async findAll() {
        const entities = await this.repository.find({ relations: ['category'] });
        return entities.map((entity) => product_mapper_1.ProductMapper.toDomain(entity));
    }
    async findByCategoryId(categoryId) {
        const entities = await this.repository.find({
            where: { categoryId },
            relations: ['category'],
        });
        return entities.map((entity) => product_mapper_1.ProductMapper.toDomain(entity));
    }
    async findActiveProducts() {
        const entities = await this.repository.find({
            where: { isActive: true },
            relations: ['category'],
        });
        return entities.map((entity) => product_mapper_1.ProductMapper.toDomain(entity));
    }
    async update(id, product) {
        await this.repository.update(id, product);
        const updated = await this.repository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!updated) {
            throw new Error('Product not found');
        }
        return product_mapper_1.ProductMapper.toDomain(updated);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
    async updateStock(id, quantity) {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) {
            throw new Error('Product not found');
        }
        entity.quantity += quantity;
        if (entity.quantity < 0) {
            throw new Error('Stock insuffisant');
        }
        const updated = await this.repository.save(entity);
        return product_mapper_1.ProductMapper.toDomain(updated);
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map