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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_product_usecase_1 = require("../../application/usecases/product/create-product.usecase");
const update_product_usecase_1 = require("../../application/usecases/product/update-product.usecase");
const list_products_usecase_1 = require("../../application/usecases/product/list-products.usecase");
const create_product_dto_1 = require("../../application/dtos/product/create-product.dto");
const update_product_dto_1 = require("../../application/dtos/product/update-product.dto");
const product_response_dto_1 = require("../../application/dtos/product/product-response.dto");
const product_with_config_dto_1 = require("../../application/dtos/product/product-with-config.dto");
const list_products_with_config_usecase_1 = require("../../application/usecases/product/list-products-with-config.usecase");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const user_entity_1 = require("../../domain/entities/user.entity");
let ProductController = class ProductController {
    createProductUseCase;
    updateProductUseCase;
    listProductsUseCase;
    listProductsWithConfigUseCase;
    constructor(createProductUseCase, updateProductUseCase, listProductsUseCase, listProductsWithConfigUseCase) {
        this.createProductUseCase = createProductUseCase;
        this.updateProductUseCase = updateProductUseCase;
        this.listProductsUseCase = listProductsUseCase;
        this.listProductsWithConfigUseCase = listProductsWithConfigUseCase;
    }
    async create(dto, user) {
        return this.createProductUseCase.execute(dto, user.id);
    }
    async findAll(activeOnly) {
        const active = activeOnly === 'true';
        return this.listProductsUseCase.execute(active);
    }
    async update(id, dto) {
        return this.updateProductUseCase.execute(id, dto);
    }
    async findAllForCustomer(customerId, activeOnly) {
        const active = activeOnly === 'true';
        return this.listProductsWithConfigUseCase.execute(customerId, active);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un produit' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Produit créé', type: product_response_dto_1.ProductResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Liste tous les produits' }),
    (0, swagger_1.ApiQuery)({ name: 'activeOnly', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des produits', type: [product_response_dto_1.ProductResponseDto] }),
    __param(0, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un produit' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Produit mis à jour', type: product_response_dto_1.ProductResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('customer/:customerId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des produits avec prix configuré pour un client' }),
    (0, swagger_1.ApiQuery)({ name: 'activeOnly', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des produits avec configuration client', type: [product_with_config_dto_1.ProductWithConfigDto] }),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAllForCustomer", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [create_product_usecase_1.CreateProductUseCase,
        update_product_usecase_1.UpdateProductUseCase,
        list_products_usecase_1.ListProductsUseCase,
        list_products_with_config_usecase_1.ListProductsWithConfigUseCase])
], ProductController);
//# sourceMappingURL=product.controller.js.map