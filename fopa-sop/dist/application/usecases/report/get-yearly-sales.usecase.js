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
exports.GetYearlySalesUseCase = void 0;
const common_1 = require("@nestjs/common");
let GetYearlySalesUseCase = class GetYearlySalesUseCase {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(year) {
        if (!year || isNaN(year) || year < 1900 || year > 2100) {
            throw new common_1.BadRequestException('Année invalide');
        }
        const startDate = new Date(year, 0, 1);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(year, 11, 31);
        endDate.setHours(23, 59, 59, 999);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new common_1.BadRequestException('Impossible de créer les dates avec l\'année fournie');
        }
        const orders = await this.orderRepository.findByDateRange(startDate, endDate);
        const totalSales = orders.reduce((sum, order) => sum + order.subtotal, 0);
        const totalOrders = orders.length;
        const totalAmountPaid = orders.reduce((sum, order) => sum + order.amountPaid, 0);
        const totalDebt = orders.reduce((sum, order) => sum + order.remainingDebt, 0);
        return {
            year,
            totalSales,
            totalOrders,
            totalAmountPaid,
            totalDebt,
        };
    }
};
exports.GetYearlySalesUseCase = GetYearlySalesUseCase;
exports.GetYearlySalesUseCase = GetYearlySalesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IOrderRepository')),
    __metadata("design:paramtypes", [Object])
], GetYearlySalesUseCase);
//# sourceMappingURL=get-yearly-sales.usecase.js.map