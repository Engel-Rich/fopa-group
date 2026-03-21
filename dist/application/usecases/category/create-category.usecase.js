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
exports.CreateCategoryUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const category_entity_1 = require("../../../domain/entities/category.entity");
let CreateCategoryUseCase = class CreateCategoryUseCase {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute(dto) {
        const existingCategory = await this.categoryRepository.findByName(dto.name);
        if (existingCategory) {
            throw new business_exception_1.AlreadyExistsException('Une catégorie avec ce nom existe déjà');
        }
        const category = new category_entity_1.Category(dto.name, dto.description);
        const savedCategory = await this.categoryRepository.create(category);
        return {
            id: savedCategory.id,
            name: savedCategory.name,
            description: savedCategory.description,
            createdAt: savedCategory.createdAt,
            updatedAt: savedCategory.updatedAt,
        };
    }
};
exports.CreateCategoryUseCase = CreateCategoryUseCase;
exports.CreateCategoryUseCase = CreateCategoryUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICategoryRepository')),
    __metadata("design:paramtypes", [Object])
], CreateCategoryUseCase);
//# sourceMappingURL=create-category.usecase.js.map