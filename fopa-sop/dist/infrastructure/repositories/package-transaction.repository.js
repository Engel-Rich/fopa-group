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
exports.PackageTransactionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const package_transaction_entity_1 = require("../database/entities/package-transaction.entity");
const package_transaction_mapper_1 = require("./mappers/package-transaction.mapper");
let PackageTransactionRepository = class PackageTransactionRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(transaction) {
        const entity = package_transaction_mapper_1.PackageTransactionMapper.toEntity(transaction);
        const saved = await this.repository.save(entity);
        const full = await this.repository.findOne({
            where: { id: saved.id },
            relations: ['user'],
        });
        if (!full)
            throw new Error('PackageTransaction not found after creation');
        return package_transaction_mapper_1.PackageTransactionMapper.toDomain(full);
    }
    async findByCustomerId(customerId) {
        const entities = await this.repository.find({
            where: { customerId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
        return entities.map(package_transaction_mapper_1.PackageTransactionMapper.toDomain);
    }
};
exports.PackageTransactionRepository = PackageTransactionRepository;
exports.PackageTransactionRepository = PackageTransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(package_transaction_entity_1.PackageTransactionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PackageTransactionRepository);
//# sourceMappingURL=package-transaction.repository.js.map