"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_controller_1 = require("../../presentation/controllers/customer.controller");
const create_customer_usecase_1 = require("../../application/usecases/customer/create-customer.usecase");
const list_customers_usecase_1 = require("../../application/usecases/customer/list-customers.usecase");
const update_customer_usecase_1 = require("../../application/usecases/customer/update-customer.usecase");
const customer_repository_1 = require("../repositories/customer.repository");
const user_repository_1 = require("../repositories/user.repository");
const customer_entity_1 = require("../database/entities/customer.entity");
const user_entity_1 = require("../database/entities/user.entity");
let CustomerModule = class CustomerModule {
};
exports.CustomerModule = CustomerModule;
exports.CustomerModule = CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_entity_1.CustomerEntity, user_entity_1.UserEntity])],
        controllers: [customer_controller_1.CustomerController],
        providers: [
            create_customer_usecase_1.CreateCustomerUseCase,
            list_customers_usecase_1.ListCustomersUseCase,
            update_customer_usecase_1.UpdateCustomerUseCase,
            {
                provide: 'ICustomerRepository',
                useClass: customer_repository_1.CustomerRepository,
            },
            {
                provide: 'IUserRepository',
                useClass: user_repository_1.UserRepository,
            },
        ],
        exports: ['ICustomerRepository'],
    })
], CustomerModule);
//# sourceMappingURL=customer.module.js.map