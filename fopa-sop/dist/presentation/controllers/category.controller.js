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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_category_usecase_1 = require("../../application/usecases/category/create-category.usecase");
const list_categories_usecase_1 = require("../../application/usecases/category/list-categories.usecase");
const create_category_dto_1 = require("../../application/dtos/category/create-category.dto");
const category_response_dto_1 = require("../../application/dtos/category/category-response.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const user_entity_1 = require("../../domain/entities/user.entity");
const update_category_dto_1 = require("../../application/dtos/category/update-category.dto");
const update_category_usecase_1 = require("../../application/usecases/category/update-category.usecase");
const delete_category_usecase_1 = require("../../application/usecases/category/delete-category.usecase");
let CategoryController = class CategoryController {
    createCategoryUseCase;
    listCategoriesUseCase;
    updateCategoryUseCase;
    deleteCategoryUseCase;
    constructor(createCategoryUseCase, listCategoriesUseCase, updateCategoryUseCase, deleteCategoryUseCase) {
        this.createCategoryUseCase = createCategoryUseCase;
        this.listCategoriesUseCase = listCategoriesUseCase;
        this.updateCategoryUseCase = updateCategoryUseCase;
        this.deleteCategoryUseCase = deleteCategoryUseCase;
    }
    async create(dto) {
        return this.createCategoryUseCase.execute(dto);
    }
    async findAll() {
        return this.listCategoriesUseCase.execute();
    }
    async update(id, dto) {
        return this.updateCategoryUseCase.execute(id, dto);
    }
    async delete(id) {
        return this.deleteCategoryUseCase.execute(id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une catégorie' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Catégorie créée', type: category_response_dto_1.CategoryResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Liste toutes les catégories' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des catégories', type: [category_response_dto_1.CategoryResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une catégorie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Catégorie mise à jour', type: category_response_dto_1.CategoryResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une catégorie' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Catégorie supprimée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('Categories'),
    (0, common_1.Controller)('categories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [create_category_usecase_1.CreateCategoryUseCase,
        list_categories_usecase_1.ListCategoriesUseCase,
        update_category_usecase_1.UpdateCategoryUseCase,
        delete_category_usecase_1.DeleteCategoryUseCase])
], CategoryController);
//# sourceMappingURL=category.controller.js.map