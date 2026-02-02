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
exports.ListCustomersUseCase = void 0;
const common_1 = require("@nestjs/common");
let ListCustomersUseCase = class ListCustomersUseCase {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(activeOnly = false) {
        const customers = activeOnly
            ? await this.customerRepository.findActiveCustomers()
            : await this.customerRepository.findAll();
        return customers.map((customer) => ({
            id: customer.id,
            userId: customer.userId,
            user: {
                id: customer.userId,
                email: customer.email,
                name: customer.name,
                phone: customer.phone,
                username: customer.username,
                role: customer.role,
                isActive: customer.isActive,
                createdAt: customer.createdAt,
                updatedAt: customer.updatedAt,
            },
            address: customer.address,
            currentDebt: customer.currentDebt,
            currentPackagesDebt: customer.currentPackagesDebt ?? 0,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        }));
    }
};
exports.ListCustomersUseCase = ListCustomersUseCase;
exports.ListCustomersUseCase = ListCustomersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICustomerRepository')),
    __metadata("design:paramtypes", [Object])
], ListCustomersUseCase);
//# sourceMappingURL=list-customers.usecase.js.map