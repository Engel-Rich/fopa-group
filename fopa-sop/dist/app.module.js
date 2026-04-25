"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const database_config_1 = require("./infrastructure/config/database.config");
const jwt_auth_guard_1 = require("./presentation/guards/jwt-auth.guard");
const global_exception_filter_1 = require("./shared/exceptions/global-exception.filter");
const auth_module_1 = require("./infrastructure/modules/auth.module");
const user_module_1 = require("./infrastructure/modules/user.module");
const category_module_1 = require("./infrastructure/modules/category.module");
const product_module_1 = require("./infrastructure/modules/product.module");
const stock_module_1 = require("./infrastructure/modules/stock.module");
const customer_module_1 = require("./infrastructure/modules/customer.module");
const order_module_1 = require("./infrastructure/modules/order.module");
const package_module_1 = require("./infrastructure/modules/package.module");
const report_module_1 = require("./infrastructure/modules/report.module");
const admin_seed_1 = require("./infrastructure/database/seeds/admin.seed");
const user_entity_1 = require("./infrastructure/database/entities/user.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: database_config_1.getDatabaseConfig,
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            stock_module_1.StockModule,
            customer_module_1.CustomerModule,
            order_module_1.OrderModule,
            package_module_1.PackageModule,
            report_module_1.ReportModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_filter_1.GlobalExceptionFilter,
            },
            admin_seed_1.AdminSeedService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map