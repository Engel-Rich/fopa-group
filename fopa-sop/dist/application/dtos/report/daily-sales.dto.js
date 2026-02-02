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
exports.DailySalesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DailySalesDto {
    date;
    totalSales;
    totalOrders;
    totalAmountPaid;
    totalDebt;
}
exports.DailySalesDto = DailySalesDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], DailySalesDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DailySalesDto.prototype, "totalSales", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DailySalesDto.prototype, "totalOrders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DailySalesDto.prototype, "totalAmountPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DailySalesDto.prototype, "totalDebt", void 0);
//# sourceMappingURL=daily-sales.dto.js.map