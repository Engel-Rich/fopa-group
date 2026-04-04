"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["PARTIALLY_PAID"] = "PARTIALLY_PAID";
    OrderStatus["PAID"] = "PAID";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
class Order {
    id;
    orderNumber;
    customerId;
    customer;
    previousDebt;
    subtotal;
    totalAmount;
    amountGiven;
    amountPaid;
    remainingDebt;
    packages;
    packagesReturned;
    remainingPackages;
    status;
    userId;
    user;
    createdBy;
    createdByUser;
    items;
    payments;
    createdAt;
    updatedAt;
    constructor(orderNumber, customerId, previousDebt, subtotal, userId, amountGiven, amountPaid, createdBy) {
        this.orderNumber = orderNumber;
        this.customerId = customerId;
        this.previousDebt = previousDebt;
        this.subtotal = subtotal;
        this.totalAmount = subtotal + previousDebt;
        this.amountGiven = amountGiven;
        this.amountPaid = amountPaid;
        this.remainingDebt = (previousDebt + subtotal) - amountPaid;
        this.packages = 0;
        this.packagesReturned = 0;
        this.remainingPackages = 0;
        this.status = OrderStatus.PENDING;
        this.userId = userId;
        this.createdBy = createdBy;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    addPayment(amount) {
        this.amountPaid += amount;
        this.remainingDebt = this.totalAmount - this.amountPaid;
        this.updateStatus();
        this.updatedAt = new Date();
    }
    addPackagesReturned(count) {
        this.packagesReturned += count;
        this.remainingPackages = Math.max(0, this.packages - this.packagesReturned);
        this.updatedAt = new Date();
    }
    setPackages(count) {
        this.packages = Math.max(0, count);
        this.remainingPackages = Math.max(0, this.packages - this.packagesReturned);
        this.updatedAt = new Date();
    }
    updateStatus() {
        if (this.remainingDebt <= 0) {
            this.status = OrderStatus.PAID;
        }
        else if (this.amountPaid > 0) {
            this.status = OrderStatus.PARTIALLY_PAID;
        }
        else {
            this.status = OrderStatus.PENDING;
        }
    }
    cancel() {
        this.status = OrderStatus.CANCELLED;
        this.updatedAt = new Date();
    }
}
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map