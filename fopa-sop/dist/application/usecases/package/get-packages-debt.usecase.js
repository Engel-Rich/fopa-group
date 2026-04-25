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
exports.GetPackagesDebtUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
let GetPackagesDebtUseCase = class GetPackagesDebtUseCase {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(customerId) {
        const customer = await this.customerRepository.findById(customerId);
        if (!customer)
            throw new business_exception_1.NotFoundException('Client');
        return {
            customerId: customer.id,
            currentPackagesDebt: customer.currentPackagesDebt ?? 0,
        };
    }
};
exports.GetPackagesDebtUseCase = GetPackagesDebtUseCase;
exports.GetPackagesDebtUseCase = GetPackagesDebtUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICustomerRepository')),
    __metadata("design:paramtypes", [Object])
], GetPackagesDebtUseCase);
//# sourceMappingURL=get-packages-debt.usecase.js.map