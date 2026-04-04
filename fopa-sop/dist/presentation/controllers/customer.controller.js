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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_customer_usecase_1 = require("../../application/usecases/customer/create-customer.usecase");
const list_customers_usecase_1 = require("../../application/usecases/customer/list-customers.usecase");
const update_customer_usecase_1 = require("../../application/usecases/customer/update-customer.usecase");
const create_customer_dto_1 = require("../../application/dtos/customer/create-customer.dto");
const update_customer_dto_1 = require("../../application/dtos/customer/update-customer.dto");
const customer_response_dto_1 = require("../../application/dtos/customer/customer-response.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const user_entity_1 = require("../../domain/entities/user.entity");
let CustomerController = class CustomerController {
    createCustomerUseCase;
    listCustomersUseCase;
    updateCustomerUseCase;
    constructor(createCustomerUseCase, listCustomersUseCase, updateCustomerUseCase) {
        this.createCustomerUseCase = createCustomerUseCase;
        this.listCustomersUseCase = listCustomersUseCase;
        this.updateCustomerUseCase = updateCustomerUseCase;
    }
    async create(dto) {
        return this.createCustomerUseCase.execute(dto);
    }
    async findAll(activeOnly) {
        const active = activeOnly === 'true';
        return this.listCustomersUseCase.execute(active);
    }
    async update(id, dto) {
        return this.updateCustomerUseCase.execute(id, dto);
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un client' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Client créé', type: customer_response_dto_1.CustomerResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Liste tous les clients' }),
    (0, swagger_1.ApiQuery)({ name: 'activeOnly', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des clients', type: [customer_response_dto_1.CustomerResponseDto] }),
    __param(0, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.CAISSIERE),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un client' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Client mis à jour', type: customer_response_dto_1.CustomerResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "update", null);
exports.CustomerController = CustomerController = __decorate([
    (0, swagger_1.ApiTags)('Customers'),
    (0, common_1.Controller)('customers'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [create_customer_usecase_1.CreateCustomerUseCase,
        list_customers_usecase_1.ListCustomersUseCase,
        update_customer_usecase_1.UpdateCustomerUseCase])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map