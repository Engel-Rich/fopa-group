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
exports.PackageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lend_packages_usecase_1 = require("../../application/usecases/package/lend-packages.usecase");
const return_packages_usecase_1 = require("../../application/usecases/package/return-packages.usecase");
const get_packages_debt_usecase_1 = require("../../application/usecases/package/get-packages-debt.usecase");
const get_packages_history_usecase_1 = require("../../application/usecases/package/get-packages-history.usecase");
const lend_packages_dto_1 = require("../../application/dtos/package/lend-packages.dto");
const return_packages_dto_1 = require("../../application/dtos/package/return-packages.dto");
const package_transaction_response_dto_1 = require("../../application/dtos/package/package-transaction-response.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const user_entity_1 = require("../../domain/entities/user.entity");
let PackageController = class PackageController {
    lendPackagesUseCase;
    returnPackagesUseCase;
    getPackagesDebtUseCase;
    getPackagesHistoryUseCase;
    constructor(lendPackagesUseCase, returnPackagesUseCase, getPackagesDebtUseCase, getPackagesHistoryUseCase) {
        this.lendPackagesUseCase = lendPackagesUseCase;
        this.returnPackagesUseCase = returnPackagesUseCase;
        this.getPackagesDebtUseCase = getPackagesDebtUseCase;
        this.getPackagesHistoryUseCase = getPackagesHistoryUseCase;
    }
    async lend(dto, user) {
        return this.lendPackagesUseCase.execute(dto, user.id);
    }
    async return(dto, user) {
        return this.returnPackagesUseCase.execute(dto, user.id);
    }
    async getDebt(customerId) {
        return this.getPackagesDebtUseCase.execute(customerId);
    }
    async getHistory(customerId) {
        return this.getPackagesHistoryUseCase.execute(customerId);
    }
};
exports.PackageController = PackageController;
__decorate([
    (0, common_1.Post)('lend'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: "Prêter des emballages à un client" }),
    (0, swagger_1.ApiResponse)({ status: 201, type: package_transaction_response_dto_1.PackageTransactionResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lend_packages_dto_1.LendPackagesDto, Object]),
    __metadata("design:returntype", Promise)
], PackageController.prototype, "lend", null);
__decorate([
    (0, common_1.Post)('return'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: "Rembourser des emballages d'un client" }),
    (0, swagger_1.ApiResponse)({ status: 201, type: package_transaction_response_dto_1.PackageTransactionResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [return_packages_dto_1.ReturnPackagesDto, Object]),
    __metadata("design:returntype", Promise)
], PackageController.prototype, "return", null);
__decorate([
    (0, common_1.Get)('debt/:customerId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE, user_entity_1.UserRole.CLIENT),
    (0, swagger_1.ApiOperation)({ summary: "Obtenir la dette d'emballage d'un client" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: package_transaction_response_dto_1.PackagesDebtResponseDto }),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackageController.prototype, "getDebt", null);
__decorate([
    (0, common_1.Get)('history/:customerId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE, user_entity_1.UserRole.CLIENT),
    (0, swagger_1.ApiOperation)({ summary: "Historique des prêts et remboursements d'emballages d'un client" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [package_transaction_response_dto_1.PackageTransactionResponseDto] }),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackageController.prototype, "getHistory", null);
exports.PackageController = PackageController = __decorate([
    (0, swagger_1.ApiTags)('Packages'),
    (0, common_1.Controller)('packages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [lend_packages_usecase_1.LendPackagesUseCase,
        return_packages_usecase_1.ReturnPackagesUseCase,
        get_packages_debt_usecase_1.GetPackagesDebtUseCase,
        get_packages_history_usecase_1.GetPackagesHistoryUseCase])
], PackageController);
//# sourceMappingURL=package.controller.js.map