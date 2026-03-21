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
exports.ListOrdersUseCase = void 0;
const common_1 = require("@nestjs/common");
let ListOrdersUseCase = class ListOrdersUseCase {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(page = 1, limit = 10, customerId, status) {
        const result = await this.orderRepository.findPaginated(page, limit, customerId, status);
        const orders = result.data.map((order) => ({
            id: order.id,
            orderNumber: order.orderNumber,
            customerId: order.customerId,
            customer: order.customer ? {
                id: order.customer.id,
                userId: order.customer.userId,
                address: order.customer.address,
                currentDebt: order.customer.currentDebt,
                currentPackagesDebt: order.customer.currentPackagesDebt ?? 0,
                createdAt: order.customer.createdAt,
                updatedAt: order.customer.updatedAt,
                user: {
                    id: order.customer.userId,
                    name: order.customer.name,
                    email: order.customer.email,
                    phone: order.customer.phone,
                    username: order.customer.username,
                    role: order.customer.role,
                    isActive: order.customer.isActive,
                    createdAt: order.customer.createdAt,
                    updatedAt: order.customer.updatedAt,
                }
            } : undefined,
            previousDebt: order.previousDebt,
            subtotal: order.subtotal,
            totalAmount: order.totalAmount,
            amountGiven: order.amountGiven,
            amountPaid: order.amountPaid,
            remainingDebt: order.remainingDebt,
            packages: order.packages,
            packagesReturned: order.packagesReturned,
            remainingPackages: order.remainingPackages,
            status: order.status,
            userId: order.userId,
            createdBy: order.createdByUser ? {
                id: order.createdByUser.id,
                name: order.createdByUser.name,
                email: order.createdByUser.email,
                phone: order.createdByUser.phone,
                username: order.createdByUser.username,
                role: order.createdByUser.role,
                isActive: order.createdByUser.isActive,
                createdAt: order.createdByUser.createdAt,
                updatedAt: order.createdByUser.updatedAt,
            } : undefined,
            items: order.items?.map((item) => ({
                id: item.id,
                orderId: item.orderId,
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                subtotal: item.subtotal,
                createdAt: item.createdAt,
            })),
            payments: order.payments?.map((payment) => ({
                id: payment.id,
                orderId: payment.orderId,
                amount: payment.amount,
                paymentMethod: payment.paymentMethod,
                reference: payment.reference,
                userId: payment.userId,
                createdAt: payment.createdAt,
            })),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }));
        return {
            orders,
            total: result.total,
            page: result.page,
            limit: result.limit,
        };
    }
};
exports.ListOrdersUseCase = ListOrdersUseCase;
exports.ListOrdersUseCase = ListOrdersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IOrderRepository')),
    __metadata("design:paramtypes", [Object])
], ListOrdersUseCase);
//# sourceMappingURL=list-orders.usecase.js.map