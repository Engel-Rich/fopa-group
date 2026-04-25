"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const package_controller_1 = require("../../presentation/controllers/package.controller");
const lend_packages_usecase_1 = require("../../application/usecases/package/lend-packages.usecase");
const return_packages_usecase_1 = require("../../application/usecases/package/return-packages.usecase");
const get_packages_debt_usecase_1 = require("../../application/usecases/package/get-packages-debt.usecase");
const get_packages_history_usecase_1 = require("../../application/usecases/package/get-packages-history.usecase");
const package_transaction_repository_1 = require("../repositories/package-transaction.repository");
const customer_repository_1 = require("../repositories/customer.repository");
const package_transaction_entity_1 = require("../database/entities/package-transaction.entity");
const customer_entity_1 = require("../database/entities/customer.entity");
let PackageModule = class PackageModule {
};
exports.PackageModule = PackageModule;
exports.PackageModule = PackageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([package_transaction_entity_1.PackageTransactionEntity, customer_entity_1.CustomerEntity]),
        ],
        controllers: [package_controller_1.PackageController],
        providers: [
            lend_packages_usecase_1.LendPackagesUseCase,
            return_packages_usecase_1.ReturnPackagesUseCase,
            get_packages_debt_usecase_1.GetPackagesDebtUseCase,
            get_packages_history_usecase_1.GetPackagesHistoryUseCase,
            {
                provide: 'IPackageTransactionRepository',
                useClass: package_transaction_repository_1.PackageTransactionRepository,
            },
            {
                provide: 'ICustomerRepository',
                useClass: customer_repository_1.CustomerRepository,
            },
        ],
    })
], PackageModule);
//# sourceMappingURL=package.module.js.map