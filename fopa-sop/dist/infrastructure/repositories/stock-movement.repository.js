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
exports.StockMovementRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stock_movement_entity_1 = require("../database/entities/stock-movement.entity");
const stock_movement_mapper_1 = require("./mappers/stock-movement.mapper");
let StockMovementRepository = class StockMovementRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(movement) {
        const entity = stock_movement_mapper_1.StockMovementMapper.toEntity(movement);
        const saved = await this.repository.save(entity);
        return stock_movement_mapper_1.StockMovementMapper.toDomain(saved);
    }
    async findById(id) {
        const entity = await this.repository.findOne({
            where: { id },
            relations: ['product', 'user'],
        });
        return entity ? stock_movement_mapper_1.StockMovementMapper.toDomain(entity) : null;
    }
    async findByProductId(productId) {
        const entities = await this.repository.find({
            where: { productId },
            relations: ['product', 'user'],
            order: { createdAt: 'DESC' },
        });
        return entities.map((entity) => stock_movement_mapper_1.StockMovementMapper.toDomain(entity));
    }
    async findByProductIdPaginated(productId, page, limit) {
        const skip = (page - 1) * limit;
        const [entities, total] = await this.repository.findAndCount({
            where: { productId },
            relations: ['product', 'user'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return {
            data: entities.map((entity) => stock_movement_mapper_1.StockMovementMapper.toDomain(entity)),
            total,
            page,
            limit,
        };
    }
    async findByType(type) {
        const entities = await this.repository.find({
            where: { type },
            relations: ['product', 'user'],
            order: { createdAt: 'DESC' },
        });
        return entities.map((entity) => stock_movement_mapper_1.StockMovementMapper.toDomain(entity));
    }
    async findAll() {
        const entities = await this.repository.find({
            relations: ['product', 'user'],
            order: { createdAt: 'DESC' },
        });
        return entities.map((entity) => stock_movement_mapper_1.StockMovementMapper.toDomain(entity));
    }
    async findByDateRange(startDate, endDate) {
        const entities = await this.repository
            .createQueryBuilder('movement')
            .where('movement.createdAt >= :startDate', { startDate })
            .andWhere('movement.createdAt <= :endDate', { endDate })
            .leftJoinAndSelect('movement.product', 'product')
            .leftJoinAndSelect('movement.user', 'user')
            .orderBy('movement.createdAt', 'DESC')
            .getMany();
        return entities.map((entity) => stock_movement_mapper_1.StockMovementMapper.toDomain(entity));
    }
    async findByProductAndDateRange(productId, startDate, endDate) {
        const entities = await this.repository
            .createQueryBuilder('movement')
            .where('movement.productId = :productId', { productId })
            .andWhere('movement.createdAt >= :startDate', { startDate })
            .andWhere('movement.createdAt <= :endDate', { endDate })
            .leftJoinAndSelect('movement.product', 'product')
            .leftJoinAndSelect('movement.user', 'user')
            .orderBy('movement.createdAt', 'DESC')
            .getMany();
        return entities.map((entity) => stock_movement_mapper_1.StockMovementMapper.toDomain(entity));
    }
};
exports.StockMovementRepository = StockMovementRepository;
exports.StockMovementRepository = StockMovementRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_movement_entity_1.StockMovementEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StockMovementRepository);
//# sourceMappingURL=stock-movement.repository.js.map