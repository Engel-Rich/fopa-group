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
exports.CreateProductUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const product_entity_1 = require("../../../domain/entities/product.entity");
const create_stock_entry_usecase_1 = require("../stock/create-stock-entry.usecase");
let CreateProductUseCase = class CreateProductUseCase {
    productRepository;
    categoryRepository;
    createStockEntryUseCase;
    constructor(productRepository, categoryRepository, createStockEntryUseCase) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.createStockEntryUseCase = createStockEntryUseCase;
    }
    async execute(dto, userId) {
        const category = await this.categoryRepository.findById(dto.categoryId);
        if (!category) {
            throw new business_exception_1.NotFoundException('Catégorie');
        }
        const product = new product_entity_1.Product(dto.name, dto.categoryId, 0, dto.price, dto.description);
        const savedProduct = await this.productRepository.create(product);
        if (dto.quantity > 0) {
            const stockEntryDto = {
                productId: savedProduct.id,
                quantity: dto.quantity,
                unitPrice: dto.price,
            };
            await this.createStockEntryUseCase.execute(stockEntryDto, userId);
            const updatedProduct = await this.productRepository.findById(savedProduct.id);
            if (updatedProduct) {
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
                    category: updatedProduct.category ? {
                        id: updatedProduct.category.id,
                        name: updatedProduct.category.name,
                        description: updatedProduct.category.description,
                        createdAt: updatedProduct.category.createdAt,
                        updatedAt: updatedProduct.category.updatedAt,
                    } : undefined,
                };
            }
        }
        return {
            id: savedProduct.id,
            name: savedProduct.name,
            categoryId: savedProduct.categoryId,
            quantity: savedProduct.quantity,
            price: savedProduct.price,
            description: savedProduct.description,
            isActive: savedProduct.isActive,
            createdAt: savedProduct.createdAt,
            updatedAt: savedProduct.updatedAt,
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
exports.CreateProductUseCase = CreateProductUseCase;
exports.CreateProductUseCase = CreateProductUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IProductRepository')),
    __param(1, (0, common_1.Inject)('ICategoryRepository')),
    __metadata("design:paramtypes", [Object, Object, create_stock_entry_usecase_1.CreateStockEntryUseCase])
], CreateProductUseCase);
//# sourceMappingURL=create-product.usecase.js.map