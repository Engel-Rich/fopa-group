"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.PaymentMethod = void 0;
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["MOBILE_MONEY"] = "MOBILE_MONEY";
    PaymentMethod["BANK_TRANSFER"] = "BANK_TRANSFER";
    PaymentMethod["OTHER"] = "OTHER";
    PaymentMethod["MANUAL_PACKAGE"] = "MANUAL_PACKAGE";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
class Payment {
    id;
    orderId;
    order;
    amount;
    paymentMethod;
    reference;
    userId;
    user;
    createdAt;
    constructor(orderId, amount, paymentMethod, userId, reference) {
        this.orderId = orderId;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.userId = userId;
        this.reference = reference;
        this.createdAt = new Date();
    }
}
exports.Payment = Payment;
//# sourceMappingURL=payment.entity.js.map