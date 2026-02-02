"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    id;
    name;
    categoryId;
    category;
    quantity;
    price;
    description;
    isActive;
    createdAt;
    updatedAt;
    constructor(name, categoryId, quantity, price, description) {
        this.name = name;
        this.categoryId = categoryId;
        this.quantity = quantity;
        this.price = price;
        this.description = description;
        this.isActive = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    updateStock(quantity) {
        this.quantity += quantity;
        if (this.quantity < 0) {
            throw new Error('Stock insuffisant');
        }
        this.updatedAt = new Date();
    }
}
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map