"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stock_controller_1 = require("../../presentation/controllers/stock.controller");
const create_stock_entry_usecase_1 = require("../../application/usecases/stock/create-stock-entry.usecase");
const create_stock_exit_usecase_1 = require("../../application/usecases/stock/create-stock-exit.usecase");
const list_stock_movements_usecase_1 = require("../../application/usecases/stock/list-stock-movements.usecase");
const stock_movement_repository_1 = require("../repositories/stock-movement.repository");
const product_repository_1 = require("../repositories/product.repository");
const stock_movement_entity_1 = require("../database/entities/stock-movement.entity");
const product_entity_1 = require("../database/entities/product.entity");
let StockModule = class StockModule {
};
exports.StockModule = StockModule;
exports.StockModule = StockModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([stock_movement_entity_1.StockMovementEntity, product_entity_1.ProductEntity])],
        controllers: [stock_controller_1.StockController],
        providers: [
            create_stock_entry_usecase_1.CreateStockEntryUseCase,
            create_stock_exit_usecase_1.CreateStockExitUseCase,
            list_stock_movements_usecase_1.ListStockMovementsUseCase,
            {
                provide: 'IStockMovementRepository',
                useClass: stock_movement_repository_1.StockMovementRepository,
            },
            {
                provide: 'IProductRepository',
                useClass: product_repository_1.ProductRepository,
            },
        ],
        exports: ['IStockMovementRepository', create_stock_entry_usecase_1.CreateStockEntryUseCase],
    })
], StockModule);
//# sourceMappingURL=stock.module.js.map