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
exports.CustomerProductPriceRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_product_price_entity_1 = require("../database/entities/customer-product-price.entity");
let CustomerProductPriceRepository = class CustomerProductPriceRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findByCustomerId(customerId) {
        const rows = await this.repository.find({ where: { customerId } });
        return rows.map((row) => ({ productId: row.productId, unitPrice: Number(row.unitPrice) }));
    }
    async findOne(customerId, productId) {
        const row = await this.repository.findOne({ where: { customerId, productId } });
        if (!row) {
            return null;
        }
        return { productId: row.productId, unitPrice: Number(row.unitPrice) };
    }
    async upsert(customerId, productId, unitPrice) {
        await this.repository.upsert({ customerId, productId, unitPrice }, ['customerId', 'productId']);
    }
};
exports.CustomerProductPriceRepository = CustomerProductPriceRepository;
exports.CustomerProductPriceRepository = CustomerProductPriceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_product_price_entity_1.CustomerProductPriceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerProductPriceRepository);
//# sourceMappingURL=customer-product-price.repository.js.map