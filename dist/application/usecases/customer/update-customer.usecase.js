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
exports.UpdateCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
let UpdateCustomerUseCase = class UpdateCustomerUseCase {
    customerRepository;
    userRepository;
    constructor(customerRepository, userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }
    async execute(id, dto) {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new business_exception_1.NotFoundException('Client');
        }
        if (dto.user) {
            const existingUser = await this.userRepository.findByEmail(customer.email);
            if (existingUser) {
                throw new business_exception_1.NotFoundException('Aucun utilisateur trouvé avec ces informations');
            }
        }
        const updatedCustomer = await this.customerRepository.update(id, dto);
        return {
            id: updatedCustomer.id,
            userId: updatedCustomer.userId,
            user: {
                id: updatedCustomer.userId,
                email: updatedCustomer.email,
                name: updatedCustomer.name,
                phone: updatedCustomer.phone,
                username: updatedCustomer.username,
                role: updatedCustomer.role,
                isActive: updatedCustomer.isActive,
                createdAt: updatedCustomer.createdAt,
                updatedAt: updatedCustomer.updatedAt,
            },
            address: updatedCustomer.address,
            currentDebt: updatedCustomer.currentDebt,
            currentPackagesDebt: updatedCustomer.currentPackagesDebt,
            createdAt: updatedCustomer.createdAt,
            updatedAt: updatedCustomer.updatedAt,
        };
    }
};
exports.UpdateCustomerUseCase = UpdateCustomerUseCase;
exports.UpdateCustomerUseCase = UpdateCustomerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICustomerRepository')),
    __param(1, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object, Object])
], UpdateCustomerUseCase);
//# sourceMappingURL=update-customer.usecase.js.map