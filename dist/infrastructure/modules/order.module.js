"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_controller_1 = require("../../presentation/controllers/order.controller");
const create_order_usecase_1 = require("../../application/usecases/order/create-order.usecase");
const add_payment_usecase_1 = require("../../application/usecases/order/add-payment.usecase");
const get_order_details_usecase_1 = require("../../application/usecases/order/get-order-details.usecase");
const list_orders_usecase_1 = require("../../application/usecases/order/list-orders.usecase");
const order_repository_1 = require("../repositories/order.repository");
const order_item_repository_1 = require("../repositories/order-item.repository");
const customer_repository_1 = require("../repositories/customer.repository");
const product_repository_1 = require("../repositories/product.repository");
const stock_movement_repository_1 = require("../repositories/stock-movement.repository");
const payment_repository_1 = require("../repositories/payment.repository");
const order_entity_1 = require("../database/entities/order.entity");
const order_item_entity_1 = require("../database/entities/order-item.entity");
const customer_entity_1 = require("../database/entities/customer.entity");
const product_entity_1 = require("../database/entities/product.entity");
const stock_movement_entity_1 = require("../database/entities/stock-movement.entity");
const payment_entity_1 = require("../database/entities/payment.entity");
const customer_product_price_entity_1 = require("../database/entities/customer-product-price.entity");
const customer_product_price_repository_1 = require("../repositories/customer-product-price.repository");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                order_entity_1.OrderEntity,
                order_item_entity_1.OrderItemEntity,
                customer_entity_1.CustomerEntity,
                product_entity_1.ProductEntity,
                customer_product_price_entity_1.CustomerProductPriceEntity,
                stock_movement_entity_1.StockMovementEntity,
                payment_entity_1.PaymentEntity,
            ]),
        ],
        controllers: [order_controller_1.OrderController],
        providers: [
            create_order_usecase_1.CreateOrderUseCase,
            add_payment_usecase_1.AddPaymentUseCase,
            get_order_details_usecase_1.GetOrderDetailsUseCase,
            list_orders_usecase_1.ListOrdersUseCase,
            {
                provide: 'IOrderRepository',
                useClass: order_repository_1.OrderRepository,
            },
            {
                provide: 'IOrderItemRepository',
                useClass: order_item_repository_1.OrderItemRepository,
            },
            {
                provide: 'ICustomerRepository',
                useClass: customer_repository_1.CustomerRepository,
            },
            {
                provide: 'IProductRepository',
                useClass: product_repository_1.ProductRepository,
            },
            {
                provide: 'ICustomerProductPriceRepository',
                useClass: customer_product_price_repository_1.CustomerProductPriceRepository,
            },
            {
                provide: 'IStockMovementRepository',
                useClass: stock_movement_repository_1.StockMovementRepository,
            },
            {
                provide: 'IPaymentRepository',
                useClass: payment_repository_1.PaymentRepository,
            },
        ],
        exports: ['IOrderRepository', 'IPaymentRepository'],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map