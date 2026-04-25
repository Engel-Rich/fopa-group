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
exports.ReturnPackagesUseCase = void 0;
const common_1 = require("@nestjs/common");
const package_transaction_entity_1 = require("../../../domain/entities/package-transaction.entity");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
let ReturnPackagesUseCase = class ReturnPackagesUseCase {
    customerRepository;
    packageTransactionRepository;
    constructor(customerRepository, packageTransactionRepository) {
        this.customerRepository = customerRepository;
        this.packageTransactionRepository = packageTransactionRepository;
    }
    async execute(dto, userId) {
        const customer = await this.customerRepository.findById(dto.customerId);
        if (!customer)
            throw new business_exception_1.NotFoundException('Client');
        const currentDebt = customer.currentPackagesDebt ?? 0;
        if (currentDebt <= 0) {
            throw new business_exception_1.InvalidOrderException("Ce client n'a aucune dette d'emballage");
        }
        if (dto.quantity > currentDebt) {
            throw new business_exception_1.InvalidOrderException(`Le nombre d'emballages remboursés (${dto.quantity}) dépasse la dette actuelle (${currentDebt})`);
        }
        const transaction = new package_transaction_entity_1.PackageTransaction(dto.customerId, package_transaction_entity_1.PackageTransactionType.RETURN, dto.quantity, userId, dto.notes);
        const saved = await this.packageTransactionRepository.create(transaction);
        const newDebt = currentDebt - dto.quantity;
        await this.customerRepository.updatePackagesDebt(dto.customerId, newDebt);
        return {
            id: saved.id,
            customerId: saved.customerId,
            type: saved.type,
            quantity: saved.quantity,
            userId: saved.userId,
            notes: saved.notes,
            createdAt: saved.createdAt,
        };
    }
};
exports.ReturnPackagesUseCase = ReturnPackagesUseCase;
exports.ReturnPackagesUseCase = ReturnPackagesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICustomerRepository')),
    __param(1, (0, common_1.Inject)('IPackageTransactionRepository')),
    __metadata("design:paramtypes", [Object, Object])
], ReturnPackagesUseCase);
//# sourceMappingURL=return-packages.usecase.js.map