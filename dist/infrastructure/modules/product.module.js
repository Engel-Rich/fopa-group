"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_controller_1 = require("../../presentation/controllers/product.controller");
const create_product_usecase_1 = require("../../application/usecases/product/create-product.usecase");
const update_product_usecase_1 = require("../../application/usecases/product/update-product.usecase");
const list_products_usecase_1 = require("../../application/usecases/product/list-products.usecase");
const product_repository_1 = require("../repositories/product.repository");
const category_repository_1 = require("../repositories/category.repository");
const product_entity_1 = require("../database/entities/product.entity");
const category_entity_1 = require("../database/entities/category.entity");
const customer_entity_1 = require("../database/entities/customer.entity");
const customer_product_price_entity_1 = require("../database/entities/customer-product-price.entity");
const stock_module_1 = require("./stock.module");
const customer_repository_1 = require("../repositories/customer.repository");
const customer_product_price_repository_1 = require("../repositories/customer-product-price.repository");
const list_products_with_config_usecase_1 = require("../../application/usecases/product/list-products-with-config.usecase");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                product_entity_1.ProductEntity,
                category_entity_1.CategoryEntity,
                customer_entity_1.CustomerEntity,
                customer_product_price_entity_1.CustomerProductPriceEntity,
            ]),
            stock_module_1.StockModule,
        ],
        controllers: [product_controller_1.ProductController],
        providers: [
            create_product_usecase_1.CreateProductUseCase,
            update_product_usecase_1.UpdateProductUseCase,
            list_products_usecase_1.ListProductsUseCase,
            list_products_with_config_usecase_1.ListProductsWithConfigUseCase,
            {
                provide: 'IProductRepository',
                useClass: product_repository_1.ProductRepository,
            },
            {
                provide: 'ICategoryRepository',
                useClass: category_repository_1.CategoryRepository,
            },
            {
                provide: 'ICustomerRepository',
                useClass: customer_repository_1.CustomerRepository,
            },
            {
                provide: 'ICustomerProductPriceRepository',
                useClass: customer_product_price_repository_1.CustomerProductPriceRepository,
            },
        ],
        exports: ['IProductRepository'],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map