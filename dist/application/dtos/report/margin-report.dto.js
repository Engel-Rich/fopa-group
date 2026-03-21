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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarginReportDto = exports.ProductMarginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProductMarginDto {
    productId;
    productName;
    totalSold;
    averageCost;
    averageSalePrice;
    totalRevenue;
    totalCost;
    margin;
    marginPercentage;
}
exports.ProductMarginDto = ProductMarginDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProductMarginDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProductMarginDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductMarginDto.prototype, "totalSold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductMarginDto.prototype, "averageCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductMarginDto.prototype, "averageSalePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductMarginDto.prototype, "totalRevenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductMarginDto.prototype, "totalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductMarginDto.prototype, "margin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductMarginDto.prototype, "marginPercentage", void 0);
class MarginReportDto {
    products;
    totalRevenue;
    totalCost;
    totalMargin;
    averageMarginPercentage;
}
exports.MarginReportDto = MarginReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProductMarginDto] }),
    __metadata("design:type", Array)
], MarginReportDto.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MarginReportDto.prototype, "totalRevenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MarginReportDto.prototype, "totalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MarginReportDto.prototype, "totalMargin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MarginReportDto.prototype, "averageMarginPercentage", void 0);
//# sourceMappingURL=margin-report.dto.js.map