"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageTransaction = exports.PackageTransactionType = void 0;
var PackageTransactionType;
(function (PackageTransactionType) {
    PackageTransactionType["LEND"] = "LEND";
    PackageTransactionType["RETURN"] = "RETURN";
})(PackageTransactionType || (exports.PackageTransactionType = PackageTransactionType = {}));
class PackageTransaction {
    id;
    customerId;
    type;
    quantity;
    userId;
    notes;
    createdAt;
    constructor(customerId, type, quantity, userId, notes) {
        this.customerId = customerId;
        this.type = type;
        this.quantity = quantity;
        this.userId = userId;
        this.notes = notes;
        this.createdAt = new Date();
    }
}
exports.PackageTransaction = PackageTransaction;
//# sourceMappingURL=package-transaction.entity.js.map