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
exports.ListProductsUseCase = void 0;
const common_1 = require("@nestjs/common");
let ListProductsUseCase = class ListProductsUseCase {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(activeOnly = false) {
        const products = activeOnly
            ? await this.productRepository.findActiveProducts()
            : await this.productRepository.findAll();
        return products.map((product) => ({
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
            price: product.price,
            description: product.description,
            isActive: product.isActive,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }));
    }
};
exports.ListProductsUseCase = ListProductsUseCase;
exports.ListProductsUseCase = ListProductsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IProductRepository')),
    __metadata("design:paramtypes", [Object])
], ListProductsUseCase);
//# sourceMappingURL=list-products.usecase.js.map