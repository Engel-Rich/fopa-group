"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
class OrderItem {
    id;
    orderId;
    order;
    productId;
    product;
    productName;
    quantity;
    unitPrice;
    subtotal;
    createdAt;
    constructor(orderId, productId, productName, quantity, unitPrice) {
        this.orderId = orderId;
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.subtotal = quantity * unitPrice;
        this.createdAt = new Date();
    }
}
exports.OrderItem = OrderItem;
//# sourceMappingURL=order-item.entity.js.map