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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_daily_sales_usecase_1 = require("../../application/usecases/report/get-daily-sales.usecase");
const get_monthly_sales_usecase_1 = require("../../application/usecases/report/get-monthly-sales.usecase");
const get_yearly_sales_usecase_1 = require("../../application/usecases/report/get-yearly-sales.usecase");
const daily_sales_list_dto_1 = require("../../application/dtos/report/daily-sales-list.dto");
const monthly_sales_dto_1 = require("../../application/dtos/report/monthly-sales.dto");
const yearly_sales_dto_1 = require("../../application/dtos/report/yearly-sales.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const user_entity_1 = require("../../domain/entities/user.entity");
let ReportController = class ReportController {
    getDailySalesUseCase;
    getMonthlySalesUseCase;
    getYearlySalesUseCase;
    constructor(getDailySalesUseCase, getMonthlySalesUseCase, getYearlySalesUseCase) {
        this.getDailySalesUseCase = getDailySalesUseCase;
        this.getMonthlySalesUseCase = getMonthlySalesUseCase;
        this.getYearlySalesUseCase = getYearlySalesUseCase;
    }
    async getDailySales(page, limit) {
        const pageNumber = page ? parseInt(page, 10) : 1;
        const limitNumber = limit ? parseInt(limit, 10) : 10;
        if (isNaN(pageNumber) || isNaN(limitNumber)) {
            throw new common_1.BadRequestException('Les paramètres page et limit doivent être des nombres valides');
        }
        return this.getDailySalesUseCase.execute(pageNumber, limitNumber);
    }
    async getMonthlySales(month, year) {
        const now = new Date();
        const defaultMonth = now.getMonth() + 1;
        const defaultYear = now.getFullYear();
        let monthNumber;
        let yearNumber;
        if (month) {
            monthNumber = parseInt(month, 10);
            if (isNaN(monthNumber)) {
                throw new common_1.BadRequestException('Le paramètre month doit être un nombre valide');
            }
            if (monthNumber < 1 || monthNumber > 12) {
                throw new common_1.BadRequestException('Le mois doit être entre 1 et 12');
            }
        }
        else {
            monthNumber = defaultMonth;
        }
        if (year) {
            yearNumber = parseInt(year, 10);
            if (isNaN(yearNumber)) {
                throw new common_1.BadRequestException('Le paramètre year doit être un nombre valide');
            }
            if (yearNumber < 1900 || yearNumber > 2100) {
                throw new common_1.BadRequestException('L\'année doit être entre 1900 et 2100');
            }
        }
        else {
            yearNumber = defaultYear;
        }
        return this.getMonthlySalesUseCase.execute(monthNumber, yearNumber);
    }
    async getYearlySales(year) {
        const now = new Date();
        const defaultYear = now.getFullYear();
        let yearNumber;
        if (year) {
            yearNumber = parseInt(year, 10);
            if (isNaN(yearNumber)) {
                throw new common_1.BadRequestException('Le paramètre year doit être un nombre valide');
            }
            if (yearNumber < 1900 || yearNumber > 2100) {
                throw new common_1.BadRequestException('L\'année doit être entre 1900 et 2100');
            }
        }
        else {
            yearNumber = defaultYear;
        }
        return this.getYearlySalesUseCase.execute(yearNumber);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)('daily'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir les ventes quotidiennes paginées' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste paginée des ventes quotidiennes', type: daily_sales_list_dto_1.DailySalesListDto }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getDailySales", null);
__decorate([
    (0, common_1.Get)('monthly'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir les ventes mensuelles' }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false, type: Number, example: 1, description: 'Mois (1-12). Par défaut: mois en cours' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false, type: Number, example: 2024, description: 'Année. Par défaut: année en cours' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ventes mensuelles', type: monthly_sales_dto_1.MonthlySalesDto }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getMonthlySales", null);
__decorate([
    (0, common_1.Get)('yearly'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir les ventes annuelles' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false, type: Number, example: 2024, description: 'Année. Par défaut: année en cours' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ventes annuelles', type: yearly_sales_dto_1.YearlySalesDto }),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getYearlySales", null);
exports.ReportController = ReportController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [get_daily_sales_usecase_1.GetDailySalesUseCase,
        get_monthly_sales_usecase_1.GetMonthlySalesUseCase,
        get_yearly_sales_usecase_1.GetYearlySalesUseCase])
], ReportController);
//# sourceMappingURL=report.controller.js.map