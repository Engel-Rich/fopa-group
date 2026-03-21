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
exports.ListProductsWithConfigUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
let ListProductsWithConfigUseCase = class ListProductsWithConfigUseCase {
    productRepository;
    customerRepository;
    customerProductPriceRepository;
    constructor(productRepository, customerRepository, customerProductPriceRepository) {
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.customerProductPriceRepository = customerProductPriceRepository;
    }
    async execute(customerId, activeOnly = false) {
        const customer = await this.customerRepository.findById(customerId);
        if (!customer) {
            throw new business_exception_1.NotFoundException('Client');
        }
        const products = activeOnly
            ? await this.productRepository.findActiveProducts()
            : await this.productRepository.findAll();
        const configRows = await this.customerProductPriceRepository.findByCustomerId(customerId);
        const configMap = new Map(configRows.map((row) => [row.productId, row.unitPrice]));
        return products.map((product) => {
            const configuredUnitPrice = configMap.get(product.id) ?? null;
            const defaultUnitPrice = configuredUnitPrice ?? Number(product.price);
            return {
                id: product.id,
                name: product.name,
                categoryId: product.categoryId,
                quantity: product.quantity,
                category: product.category ? {
                    id: product.category.id,
                    name: product.category.name,
                    description: product.category.description,
                    createdAt: product.category.createdAt,
                    updatedAt: product.category.updatedAt,
                } : undefined,
                price: Number(product.price),
                configuredUnitPrice,
                defaultUnitPrice,
                description: product.description,
                isActive: product.isActive,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            };
        });
    }
};
exports.ListProductsWithConfigUseCase = ListProductsWithConfigUseCase;
exports.ListProductsWithConfigUseCase = ListProductsWithConfigUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IProductRepository')),
    __param(1, (0, common_1.Inject)('ICustomerRepository')),
    __param(2, (0, common_1.Inject)('ICustomerProductPriceRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], ListProductsWithConfigUseCase);
//# sourceMappingURL=list-products-with-config.usecase.js.map