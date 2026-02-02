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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_order_usecase_1 = require("../../application/usecases/order/create-order.usecase");
const add_payment_usecase_1 = require("../../application/usecases/order/add-payment.usecase");
const get_order_details_usecase_1 = require("../../application/usecases/order/get-order-details.usecase");
const list_orders_usecase_1 = require("../../application/usecases/order/list-orders.usecase");
const create_order_dto_1 = require("../../application/dtos/order/create-order.dto");
const add_payment_dto_1 = require("../../application/dtos/order/add-payment.dto");
const order_response_dto_1 = require("../../application/dtos/order/order-response.dto");
const order_list_dto_1 = require("../../application/dtos/order/order-list.dto");
const payment_response_dto_1 = require("../../application/dtos/order/payment-response.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const user_entity_1 = require("../../domain/entities/user.entity");
const order_entity_1 = require("../../domain/entities/order.entity");
let OrderController = class OrderController {
    createOrderUseCase;
    addPaymentUseCase;
    getOrderDetailsUseCase;
    listOrdersUseCase;
    constructor(createOrderUseCase, addPaymentUseCase, getOrderDetailsUseCase, listOrdersUseCase) {
        this.createOrderUseCase = createOrderUseCase;
        this.addPaymentUseCase = addPaymentUseCase;
        this.getOrderDetailsUseCase = getOrderDetailsUseCase;
        this.listOrdersUseCase = listOrdersUseCase;
    }
    async findAll(page, limit, customerId, status) {
        const pageNumber = page ? parseInt(page, 10) : 1;
        const limitNumber = limit ? parseInt(limit, 10) : 10;
        return this.listOrdersUseCase.execute(pageNumber, limitNumber, customerId, status);
    }
    async create(dto, user) {
        console.log('current user', user);
        const response = await this.createOrderUseCase.execute(dto, user.id);
        return await this.getOrderDetailsUseCase.execute(response.id);
    }
    async findOne(id) {
        return this.getOrderDetailsUseCase.execute(id);
    }
    async addPayment(dto, user) {
        return this.addPaymentUseCase.execute(dto, user.id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des commandes avec pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Numéro de page (défaut: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page (défaut: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'customerId', required: false, type: String, description: 'Filtrer par ID du client' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: order_entity_1.OrderStatus, description: 'Filtrer par statut de la commande' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste paginée des commandes', type: order_list_dto_1.OrderListDto }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('customerId')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une commande' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Commande créée', type: order_response_dto_1.OrderResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir les détails d\'une commande' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Détails de la commande', type: order_response_dto_1.OrderResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/payments'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Ajouter un paiement à une commande' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Paiement ajouté', type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_payment_dto_1.AddPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addPayment", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [create_order_usecase_1.CreateOrderUseCase,
        add_payment_usecase_1.AddPaymentUseCase,
        get_order_details_usecase_1.GetOrderDetailsUseCase,
        list_orders_usecase_1.ListOrdersUseCase])
], OrderController);
//# sourceMappingURL=order.controller.js.map