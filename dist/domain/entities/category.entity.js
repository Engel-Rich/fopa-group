"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    id;
    name;
    description;
    createdAt;
    updatedAt;
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map