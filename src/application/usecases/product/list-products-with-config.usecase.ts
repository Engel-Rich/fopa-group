import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { ICustomerProductPriceRepository } from '../../../domain/repositories/customer-product-price.repository.interface';
import { NotFoundException } from '../../../shared/exceptions/business.exception';
import { ProductWithConfigDto } from '../../dtos/product/product-with-config.dto';

@Injectable()
export class ListProductsWithConfigUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('ICustomerProductPriceRepository')
    private readonly customerProductPriceRepository: ICustomerProductPriceRepository,
  ) { }

  async execute(customerId: string, activeOnly: boolean = false): Promise<ProductWithConfigDto[]> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Client');
    }

    const products = activeOnly
      ? await this.productRepository.findActiveProducts()
      : await this.productRepository.findAll();
    const configRows = await this.customerProductPriceRepository.findByCustomerId(customerId);
    const configMap = new Map(configRows.map((row) => [row.productId, row.unitPrice]));

    return products.map((product) => {
      const configuredUnitPrice = configMap.get(product.id) ?? null;
      const defaultUnitPrice = configuredUnitPrice ?? Number(product.price);
      return {
        id: product.id,
        name: product.name,
        categoryId: product.categoryId,
        quantity: product.quantity,
        category: product.category ? {
          id: product.category.id,
          name: product.category.name,
          description: product.category.description,
          createdAt: product.category.createdAt,
          updatedAt: product.category.updatedAt,
        } : undefined,
        price: Number(product.price),
        configuredUnitPrice,
        defaultUnitPrice,
        description: product.description,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  }
}
