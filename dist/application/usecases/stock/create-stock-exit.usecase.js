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
exports.CreateStockExitUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const stock_movement_entity_1 = require("../../../domain/entities/stock-movement.entity");
let CreateStockExitUseCase = class CreateStockExitUseCase {
    stockMovementRepository;
    productRepository;
    constructor(stockMovementRepository, productRepository) {
        this.stockMovementRepository = stockMovementRepository;
        this.productRepository = productRepository;
    }
    async execute(dto, userId) {
        const product = await this.productRepository.findById(dto.productId);
        if (!product) {
            throw new business_exception_1.NotFoundException('Produit');
        }
        if (product.quantity < dto.quantity) {
            throw new business_exception_1.InsufficientStockException(product.name, product.quantity, dto.quantity);
        }
        const movement = new stock_movement_entity_1.StockMovement(dto.productId, stock_movement_entity_1.StockMovementType.SORTIE, dto.quantity, product.price, dto.reason, userId);
        const savedMovement = await this.stockMovementRepository.create(movement);
        await this.productRepository.updateStock(dto.productId, -dto.quantity);
        return {
            id: savedMovement.id,
            productId: savedMovement.productId,
            type: savedMovement.type,
            quantity: savedMovement.quantity,
            unitPrice: savedMovement.unitPrice,
            totalAmount: savedMovement.totalAmount,
            reason: savedMovement.reason,
            userId: savedMovement.userId,
            createdAt: savedMovement.createdAt,
        };
    }
};
exports.CreateStockExitUseCase = CreateStockExitUseCase;
exports.CreateStockExitUseCase = CreateStockExitUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IStockMovementRepository')),
    __param(1, (0, common_1.Inject)('IProductRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateStockExitUseCase);
//# sourceMappingURL=create-stock-exit.usecase.js.map