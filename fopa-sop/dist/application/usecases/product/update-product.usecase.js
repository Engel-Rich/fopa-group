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
exports.UpdateProductUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
let UpdateProductUseCase = class UpdateProductUseCase {
    productRepository;
    categoryRepository;
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async execute(id, dto) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new business_exception_1.NotFoundException('Produit');
        }
        if (dto.categoryId) {
            const category = await this.categoryRepository.findById(dto.categoryId);
            if (!category) {
                throw new business_exception_1.NotFoundException('Catégorie');
            }
        }
        const updatedProduct = await this.productRepository.update(id, dto);
        return {
            id: updatedProduct.id,
            name: updatedProduct.name,
            categoryId: updatedProduct.categoryId,
            quantity: updatedProduct.quantity,
            price: updatedProduct.price,
            description: updatedProduct.description,
            isActive: updatedProduct.isActive,
            createdAt: updatedProduct.createdAt,
            updatedAt: updatedProduct.updatedAt,
            category: product.category ? {
                id: product.category.id,
                name: product.category.name,
                description: product.category.description,
                createdAt: product.category.createdAt,
                updatedAt: product.category.updatedAt,
            } : undefined,
        };
    }
};
exports.UpdateProductUseCase = UpdateProductUseCase;
exports.UpdateProductUseCase = UpdateProductUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IProductRepository')),
    __param(1, (0, common_1.Inject)('ICategoryRepository')),
    __metadata("design:paramtypes", [Object, Object])
], UpdateProductUseCase);
//# sourceMappingURL=update-product.usecase.js.map