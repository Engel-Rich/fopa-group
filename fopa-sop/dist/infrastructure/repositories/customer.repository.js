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
exports.CustomerRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../database/entities/customer.entity");
const customer_mapper_1 = require("./mappers/customer.mapper");
let CustomerRepository = class CustomerRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(customer, userId) {
        const entity = customer_mapper_1.CustomerMapper.toEntity(customer, userId);
        const saved = await this.repository.save(entity);
        const fullEntity = await this.repository.findOne({
            where: { id: saved.id },
            relations: ['user'],
        });
        if (!fullEntity) {
            throw new Error('Customer not found after creation');
        }
        return customer_mapper_1.CustomerMapper.toDomain(fullEntity);
    }
    async findById(id) {
        const entity = await this.repository.findOne({
            where: { id },
            relations: ['user'],
        });
        return entity ? customer_mapper_1.CustomerMapper.toDomain(entity) : null;
    }
    async findByUserId(userId) {
        const entity = await this.repository.findOne({
            where: { userId },
            relations: ['user'],
        });
        return entity ? customer_mapper_1.CustomerMapper.toDomain(entity) : null;
    }
    async findByPhone(phone) {
        const entity = await this.repository
            .createQueryBuilder('customer')
            .leftJoinAndSelect('customer.user', 'user')
            .where('user.phone = :phone', { phone })
            .getOne();
        return entity ? customer_mapper_1.CustomerMapper.toDomain(entity) : null;
    }
    async findAll() {
        const entities = await this.repository.find({
            relations: ['user'],
        });
        return entities.map((entity) => customer_mapper_1.CustomerMapper.toDomain(entity));
    }
    async findActiveCustomers() {
        const entities = await this.repository
            .createQueryBuilder('customer')
            .leftJoinAndSelect('customer.user', 'user')
            .where('user.isActive = :isActive', { isActive: true })
            .getMany();
        return entities.map((entity) => customer_mapper_1.CustomerMapper.toDomain(entity));
    }
    async update(id, updateCustomerDto) {
        await this.repository.update(id, {
            address: updateCustomerDto.address,
            ...(updateCustomerDto.user && {
                user: {
                    ...(updateCustomerDto.user.email && { email: updateCustomerDto.user.email }),
                    ...(updateCustomerDto.user.name && { name: updateCustomerDto.user.name }),
                    ...(updateCustomerDto.user.phone && { phone: updateCustomerDto.user.phone }),
                    ...(updateCustomerDto.user.username && { username: updateCustomerDto.user.username }),
                }
            }),
        });
        const updated = await this.repository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!updated) {
            throw new Error('Customer not found');
        }
        return customer_mapper_1.CustomerMapper.toDomain(updated);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
    async updateDebt(id, debt) {
        await this.repository.update(id, { currentDebt: debt });
        const updated = await this.repository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!updated) {
            throw new Error('Customer not found');
        }
        return customer_mapper_1.CustomerMapper.toDomain(updated);
    }
    async updatePackagesDebt(id, packagesDebt) {
        await this.repository.update(id, { currentPackagesDebt: packagesDebt });
        const updated = await this.repository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!updated) {
            throw new Error('Customer not found');
        }
        return customer_mapper_1.CustomerMapper.toDomain(updated);
    }
};
exports.CustomerRepository = CustomerRepository;
exports.CustomerRepository = CustomerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerRepository);
//# sourceMappingURL=customer.repository.js.map