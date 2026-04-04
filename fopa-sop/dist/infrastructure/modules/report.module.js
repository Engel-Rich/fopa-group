"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const report_controller_1 = require("../../presentation/controllers/report.controller");
const get_daily_sales_usecase_1 = require("../../application/usecases/report/get-daily-sales.usecase");
const get_monthly_sales_usecase_1 = require("../../application/usecases/report/get-monthly-sales.usecase");
const get_yearly_sales_usecase_1 = require("../../application/usecases/report/get-yearly-sales.usecase");
const order_repository_1 = require("../repositories/order.repository");
const order_entity_1 = require("../database/entities/order.entity");
let ReportModule = class ReportModule {
};
exports.ReportModule = ReportModule;
exports.ReportModule = ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([order_entity_1.OrderEntity])],
        controllers: [report_controller_1.ReportController],
        providers: [
            get_daily_sales_usecase_1.GetDailySalesUseCase,
            get_monthly_sales_usecase_1.GetMonthlySalesUseCase,
            get_yearly_sales_usecase_1.GetYearlySalesUseCase,
            {
                provide: 'IOrderRepository',
                useClass: order_repository_1.OrderRepository,
            },
        ],
    })
], ReportModule);
//# sourceMappingURL=report.module.js.map