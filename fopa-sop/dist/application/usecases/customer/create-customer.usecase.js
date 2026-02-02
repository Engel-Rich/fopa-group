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
exports.CreateCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const customer_entity_1 = require("../../../domain/entities/customer.entity");
const user_entity_1 = require("../../../domain/entities/user.entity");
const user_mapper_1 = require("../../../infrastructure/repositories/mappers/user.mapper");
let CreateCustomerUseCase = class CreateCustomerUseCase {
    customerRepository;
    userRepository;
    constructor(customerRepository, userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }
    async execute(dto) {
        if (dto.user.email) {
            const existingUser = await this.userRepository.findByEmail(dto.user.email);
            if (existingUser) {
                throw new business_exception_1.AlreadyExistsException('Un utilisateur avec cet email existe déjà');
            }
        }
        const existingUsername = await this.userRepository.findByUsername(dto.user.username);
        if (existingUsername) {
            throw new business_exception_1.AlreadyExistsException('Un utilisateur avec ce nom d\'utilisateur existe déjà');
        }
        const existingPhone = await this.userRepository.findByPhone(dto.user.phone);
        if (existingPhone) {
            throw new business_exception_1.AlreadyExistsException('Un utilisateur avec ce numéro de téléphone existe déjà');
        }
        dto.user.role = user_entity_1.UserRole.CLIENT;
        const user = user_mapper_1.UserMapper.toModelFromDto(dto.user);
        const savedUser = await this.userRepository.create(user);
        const customer = new customer_entity_1.Customer(user.name, user.password, user.username, dto.address, savedUser.id, user.email, user.phone);
        const savedCustomer = await this.customerRepository.create(customer, savedUser.id);
        return {
            id: savedCustomer.id,
            userId: savedCustomer.userId,
            user: {
                id: savedUser.id,
                email: user.email,
                name: savedUser.name,
                phone: savedUser.phone,
                username: savedUser.username,
                role: savedUser.role,
                isActive: savedUser.isActive,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt,
            },
            address: savedCustomer.address,
            currentDebt: savedCustomer.currentDebt,
            currentPackagesDebt: savedCustomer.currentPackagesDebt,
            createdAt: savedCustomer.createdAt,
            updatedAt: savedCustomer.updatedAt,
        };
    }
};
exports.CreateCustomerUseCase = CreateCustomerUseCase;
exports.CreateCustomerUseCase = CreateCustomerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICustomerRepository')),
    __param(1, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateCustomerUseCase);
//# sourceMappingURL=create-customer.usecase.js.map