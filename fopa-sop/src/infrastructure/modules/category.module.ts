import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from '../../presentation/controllers/category.controller';
import { CreateCategoryUseCase } from '../../application/usecases/category/create-category.usecase';
import { ListCategoriesUseCase } from '../../application/usecases/category/list-categories.usecase';
import { UpdateCategoryUseCase } from '../../application/usecases/category/update-category.usecase';
import { DeleteCategoryUseCase } from '../../application/usecases/category/delete-category.usecase';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryEntity } from '../database/entities/category.entity';
import { ProductModule } from './product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), ProductModule],
  controllers: [CategoryController],
  providers: [
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
  ],
  exports: ['ICategoryRepository'],
})
export class CategoryModule {}
