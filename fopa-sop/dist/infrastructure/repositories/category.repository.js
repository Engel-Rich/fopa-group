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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../database/entities/category.entity");
const category_mapper_1 = require("./mappers/category.mapper");
let CategoryRepository = class CategoryRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(category) {
        const entity = category_mapper_1.CategoryMapper.toEntity(category);
        const saved = await this.repository.save(entity);
        return category_mapper_1.CategoryMapper.toDomain(saved);
    }
    async findById(id) {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? category_mapper_1.CategoryMapper.toDomain(entity) : null;
    }
    async findByName(name) {
        const entity = await this.repository.findOne({ where: { name } });
        return entity ? category_mapper_1.CategoryMapper.toDomain(entity) : null;
    }
    async findAll() {
        const entities = await this.repository.find();
        return entities.map((entity) => category_mapper_1.CategoryMapper.toDomain(entity));
    }
    async update(id, category) {
        await this.repository.update(id, category);
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) {
            throw new Error('Category not found');
        }
        return category_mapper_1.CategoryMapper.toDomain(updated);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryRepository);
//# sourceMappingURL=category.repository.js.map