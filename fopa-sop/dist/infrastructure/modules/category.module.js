"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_controller_1 = require("../../presentation/controllers/category.controller");
const create_category_usecase_1 = require("../../application/usecases/category/create-category.usecase");
const list_categories_usecase_1 = require("../../application/usecases/category/list-categories.usecase");
const update_category_usecase_1 = require("../../application/usecases/category/update-category.usecase");
const delete_category_usecase_1 = require("../../application/usecases/category/delete-category.usecase");
const category_repository_1 = require("../repositories/category.repository");
const category_entity_1 = require("../database/entities/category.entity");
const product_module_1 = require("./product.module");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([category_entity_1.CategoryEntity]), product_module_1.ProductModule],
        controllers: [category_controller_1.CategoryController],
        providers: [
            create_category_usecase_1.CreateCategoryUseCase,
            list_categories_usecase_1.ListCategoriesUseCase,
            update_category_usecase_1.UpdateCategoryUseCase,
            delete_category_usecase_1.DeleteCategoryUseCase,
            {
                provide: 'ICategoryRepository',
                useClass: category_repository_1.CategoryRepository,
            },
        ],
        exports: ['ICategoryRepository'],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map