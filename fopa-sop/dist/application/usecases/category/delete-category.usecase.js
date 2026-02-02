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
exports.DeleteCategoryUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
let DeleteCategoryUseCase = class DeleteCategoryUseCase {
    categoryRepository;
    productRepository;
    constructor(categoryRepository, productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
    async execute(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new business_exception_1.NotFoundException('Catégorie');
        }
        const products = await this.productRepository.findByCategoryId(id);
        if (products.length > 0) {
            throw new business_exception_1.BusinessException(`Impossible de supprimer cette catégorie car ${products.length} produit(s) y sont associé(s)`);
        }
        await this.categoryRepository.delete(id);
    }
};
exports.DeleteCategoryUseCase = DeleteCategoryUseCase;
exports.DeleteCategoryUseCase = DeleteCategoryUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICategoryRepository')),
    __param(1, (0, common_1.Inject)('IProductRepository')),
    __metadata("design:paramtypes", [Object, Object])
], DeleteCategoryUseCase);
//# sourceMappingURL=delete-category.usecase.js.map