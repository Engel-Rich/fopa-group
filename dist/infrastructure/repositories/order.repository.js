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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../domain/entities/order.entity");
const order_entity_2 = require("../database/entities/order.entity");
const order_mapper_1 = require("./mappers/order.mapper");
let OrderRepository = class OrderRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(order) {
        const entity = order_mapper_1.OrderMapper.toEntity(order);
        const saved = await this.repository.save(entity);
        return order_mapper_1.OrderMapper.toDomain(saved);
    }
    async findById(id) {
        const entity = await this.repository.findOne({
            where: { id },
            relations: ['customer', 'customer.user', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
        });
        return entity ? order_mapper_1.OrderMapper.toDomain(entity) : null;
    }
    async findByOrderNumber(orderNumber) {
        const entity = await this.repository.findOne({
            where: { orderNumber },
            relations: ['customer', 'customer.user', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
        });
        return entity ? order_mapper_1.OrderMapper.toDomain(entity) : null;
    }
    async findByCustomerId(customerId) {
        const entities = await this.repository.find({
            where: { customerId },
            relations: ['customer', 'customer.user', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
            order: { createdAt: 'DESC' },
        });
        return entities.map((entity) => order_mapper_1.OrderMapper.toDomain(entity));
    }
    async findAll() {
        const entities = await this.repository.find({
            relations: ['customer', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
            order: { createdAt: 'DESC' },
        });
        return entities.map((entity) => order_mapper_1.OrderMapper.toDomain(entity));
    }
    async findByStatus(status) {
        const entities = await this.repository.find({
            where: { status },
            relations: ['customer', 'customer.user', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
            order: { createdAt: 'DESC' },
        });
        return entities.map((entity) => order_mapper_1.OrderMapper.toDomain(entity));
    }
    async findByDateRange(startDate, endDate) {
        const entities = await this.repository.find({
            where: {
                createdAt: (0, typeorm_2.Between)(startDate, endDate),
            },
            relations: ['customer', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
            order: { createdAt: 'DESC' },
        });
        return entities.map((entity) => order_mapper_1.OrderMapper.toDomain(entity));
    }
    async update(id, order) {
        await this.repository.update(id, order);
        const updated = await this.repository.findOne({
            where: { id },
            relations: ['customer', 'customer.user', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
        });
        if (!updated) {
            throw new Error('Order not found');
        }
        return order_mapper_1.OrderMapper.toDomain(updated);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
    async findUnpaidOrdersByCustomer(customerId) {
        const entities = await this.repository
            .createQueryBuilder('order')
            .where('order.customerId = :customerId', { customerId })
            .andWhere('order.status IN (:...statuses)', {
            statuses: [order_entity_1.OrderStatus.PENDING, order_entity_1.OrderStatus.PARTIALLY_PAID],
        })
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('customer.user', 'customerUser')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.createdByUser', 'createdByUser')
            .leftJoinAndSelect('order.items', 'items')
            .leftJoinAndSelect('items.product', 'product')
            .leftJoinAndSelect('order.payments', 'payments')
            .leftJoinAndSelect('payments.user', 'paymentUser')
            .orderBy('order.createdAt', 'DESC')
            .getMany();
        return entities.map((entity) => order_mapper_1.OrderMapper.toDomain(entity));
    }
    async findOrdersWithPackagesDebtByCustomer(customerId) {
        const entities = await this.repository
            .createQueryBuilder('order')
            .where('order.customerId = :customerId', { customerId })
            .andWhere('order.remainingPackages > 0')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('customer.user', 'customerUser')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.createdByUser', 'createdByUser')
            .leftJoinAndSelect('order.items', 'items')
            .leftJoinAndSelect('items.product', 'product')
            .leftJoinAndSelect('order.payments', 'payments')
            .leftJoinAndSelect('payments.user', 'paymentUser')
            .orderBy('order.createdAt', 'ASC')
            .getMany();
        return entities.map((entity) => order_mapper_1.OrderMapper.toDomain(entity));
    }
    async findPaginated(page, limit, customerId, status) {
        const skip = (page - 1) * limit;
        const queryBuilder = this.repository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('customer.user', 'customerUser')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.createdByUser', 'createdByUser')
            .leftJoinAndSelect('order.items', 'items')
            .leftJoinAndSelect('items.product', 'product')
            .leftJoinAndSelect('order.payments', 'payments')
            .leftJoinAndSelect('payments.user', 'paymentUser')
            .orderBy('order.createdAt', 'DESC');
        if (customerId) {
            queryBuilder.andWhere('order.customerId = :customerId', { customerId });
        }
        if (status) {
            queryBuilder.andWhere('order.status = :status', { status });
        }
        const [entities, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return {
            data: entities.map((entity) => order_mapper_1.OrderMapper.toDomain(entity)),
            total,
            page,
            limit,
        };
    }
    async findDailySalesGroupedByDate(page, limit) {
        const skip = (page - 1) * limit;
        const queryBuilder = this.repository
            .createQueryBuilder('order')
            .select("DATE_TRUNC('day', order.createdAt)", 'date')
            .addSelect('SUM(order.subtotal)', 'totalSales')
            .addSelect('COUNT(order.id)', 'totalOrders')
            .addSelect('SUM(order.amountPaid)', 'totalAmountPaid')
            .addSelect('SUM(order.remainingDebt)', 'totalDebt')
            .groupBy("DATE_TRUNC('day', order.createdAt)")
            .orderBy("DATE_TRUNC('day', order.createdAt)", 'DESC');
        const totalQuery = this.repository
            .createQueryBuilder('order')
            .select("COUNT(DISTINCT DATE_TRUNC('day', order.createdAt))", 'count')
            .getRawOne();
        const [results, totalResult] = await Promise.all([
            queryBuilder
                .offset(skip)
                .limit(limit)
                .getRawMany(),
            totalQuery,
        ]);
        const total = parseInt(totalResult?.count || '0', 10);
        const data = results.map((row) => ({
            date: new Date(row.date),
            totalSales: parseFloat(row.totalSales || '0'),
            totalOrders: parseInt(row.totalOrders || '0', 10),
            totalAmountPaid: parseFloat(row.totalAmountPaid || '0'),
            totalDebt: parseFloat(row.totalDebt || '0'),
        }));
        return {
            data,
            total,
            page,
            limit,
        };
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_2.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderRepository);
//# sourceMappingURL=order.repository.js.map