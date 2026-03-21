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
exports.UpdateCategoryUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
let UpdateCategoryUseCase = class UpdateCategoryUseCase {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute(id, dto) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new business_exception_1.NotFoundException('Catégorie');
        }
        if (dto.name && dto.name !== category.name) {
            const existingCategory = await this.categoryRepository.findByName(dto.name);
            if (existingCategory && existingCategory.id !== id) {
                throw new business_exception_1.AlreadyExistsException('Une catégorie avec ce nom existe déjà');
            }
        }
        const updatedCategory = await this.categoryRepository.update(id, dto);
        return {
            id: updatedCategory.id,
            name: updatedCategory.name,
            description: updatedCategory.description,
            createdAt: updatedCategory.createdAt,
            updatedAt: updatedCategory.updatedAt,
        };
    }
};
exports.UpdateCategoryUseCase = UpdateCategoryUseCase;
exports.UpdateCategoryUseCase = UpdateCategoryUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICategoryRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateCategoryUseCase);
//# sourceMappingURL=update-category.usecase.js.map