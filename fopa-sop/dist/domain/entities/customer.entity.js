"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const user_entity_1 = require("./user.entity");
class Customer extends user_entity_1.User {
    userId;
    address;
    currentDebt;
    currentPackagesDebt;
    constructor(name, password, username, address, userId, email, phone) {
        super(name, password, username, phone, user_entity_1.UserRole
            .CLIENT, email);
        if (userId) {
            this.userId = userId;
        }
        this.address = address;
        this.currentDebt = 0;
        this.currentPackagesDebt = 0;
    }
    updateDebt(amount) {
        this.currentDebt = amount;
        this.updatedAt = new Date();
    }
    updatePackagesDebt(count) {
        this.currentPackagesDebt = count;
        this.updatedAt = new Date();
    }
}
exports.Customer = Customer;
//# sourceMappingURL=customer.entity.js.map