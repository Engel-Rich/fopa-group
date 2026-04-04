"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovement = exports.StockMovementType = void 0;
var StockMovementType;
(function (StockMovementType) {
    StockMovementType["ENTREE"] = "ENTREE";
    StockMovementType["SORTIE"] = "SORTIE";
    StockMovementType["VENTE"] = "VENTE";
})(StockMovementType || (exports.StockMovementType = StockMovementType = {}));
class StockMovement {
    id;
    productId;
    product;
    type;
    quantity;
    unitPrice;
    totalAmount;
    reason;
    userId;
    user;
    createdAt;
    constructor(productId, type, quantity, unitPrice, reason, userId) {
        this.productId = productId;
        this.type = type;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalAmount = quantity * unitPrice;
        this.reason = reason;
        if (userId) {
            this.userId = userId;
        }
        this.createdAt = new Date();
    }
}
exports.StockMovement = StockMovement;
//# sourceMappingURL=stock-movement.entity.js.map