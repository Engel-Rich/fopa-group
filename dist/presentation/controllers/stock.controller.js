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
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_stock_entry_usecase_1 = require("../../application/usecases/stock/create-stock-entry.usecase");
const create_stock_exit_usecase_1 = require("../../application/usecases/stock/create-stock-exit.usecase");
const list_stock_movements_usecase_1 = require("../../application/usecases/stock/list-stock-movements.usecase");
const create_stock_entry_dto_1 = require("../../application/dtos/stock/create-stock-entry.dto");
const create_stock_exit_dto_1 = require("../../application/dtos/stock/create-stock-exit.dto");
const stock_movement_response_dto_1 = require("../../application/dtos/stock/stock-movement-response.dto");
const stock_movement_list_dto_1 = require("../../application/dtos/stock/stock-movement-list.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const user_entity_1 = require("../../domain/entities/user.entity");
let StockController = class StockController {
    createStockEntryUseCase;
    createStockExitUseCase;
    listStockMovementsUseCase;
    constructor(createStockEntryUseCase, createStockExitUseCase, listStockMovementsUseCase) {
        this.createStockEntryUseCase = createStockEntryUseCase;
        this.createStockExitUseCase = createStockExitUseCase;
        this.listStockMovementsUseCase = listStockMovementsUseCase;
    }
    async createEntry(dto, user) {
        return this.createStockEntryUseCase.execute(dto, user.id);
    }
    async createExit(dto, user) {
        return this.createStockExitUseCase.execute(dto, user.id);
    }
    async getProductMovements(productId, page, limit) {
        const pageNumber = page ? parseInt(page, 10) : 1;
        const limitNumber = limit ? parseInt(limit, 10) : 10;
        return this.listStockMovementsUseCase.execute(productId, pageNumber, limitNumber);
    }
};
exports.StockController = StockController;
__decorate([
    (0, common_1.Post)('entry'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une entrée de stock' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Entrée de stock créée', type: stock_movement_response_dto_1.StockMovementResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_entry_dto_1.CreateStockEntryDto, Object]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "createEntry", null);
__decorate([
    (0, common_1.Post)('exit'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une sortie de stock' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Sortie de stock créée', type: stock_movement_response_dto_1.StockMovementResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_exit_dto_1.CreateStockExitDto, Object]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "createExit", null);
__decorate([
    (0, common_1.Get)('product/:productId/movements'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les mouvements de stock d\'un produit (paginé)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Numéro de page (défaut: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page (défaut: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste paginée des mouvements de stock', type: stock_movement_list_dto_1.StockMovementListDto }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getProductMovements", null);
exports.StockController = StockController = __decorate([
    (0, swagger_1.ApiTags)('Stock'),
    (0, common_1.Controller)('stock'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [create_stock_entry_usecase_1.CreateStockEntryUseCase,
        create_stock_exit_usecase_1.CreateStockExitUseCase,
        list_stock_movements_usecase_1.ListStockMovementsUseCase])
], StockController);
//# sourceMappingURL=stock.controller.js.map