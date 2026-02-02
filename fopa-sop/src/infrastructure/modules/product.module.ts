import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '../../presentation/controllers/product.controller';
import { CreateProductUseCase } from '../../application/usecases/product/create-product.usecase';
import { UpdateProductUseCase } from '../../application/usecases/product/update-product.usecase';
import { ListProductsUseCase } from '../../application/usecases/product/list-products.usecase';
import { ProductRepository } from '../repositories/product.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { ProductEntity } from '../database/entities/product.entity';
import { CategoryEntity } from '../database/entities/category.entity';
import { StockModule } from './stock.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    StockModule,
  ],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    UpdateProductUseCase,
    ListProductsUseCase,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
  ],
  exports: ['IProductRepository'],
})
export class ProductModule {}
