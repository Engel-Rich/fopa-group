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
exports.StockMovementListDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const stock_movement_response_dto_1 = require("./stock-movement-response.dto");
class StockMovementListDto {
    movements;
    total;
    page;
    limit;
}
exports.StockMovementListDto = StockMovementListDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [stock_movement_response_dto_1.StockMovementResponseDto] }),
    __metadata("design:type", Array)
], StockMovementListDto.prototype, "movements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StockMovementListDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StockMovementListDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StockMovementListDto.prototype, "limit", void 0);
//# sourceMappingURL=stock-movement-list.dto.js.map