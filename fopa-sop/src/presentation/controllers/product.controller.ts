import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateProductUseCase } from '../../application/usecases/product/create-product.usecase';
import { UpdateProductUseCase } from '../../application/usecases/product/update-product.usecase';
import { ListProductsUseCase } from '../../application/usecases/product/list-products.usecase';
import { CreateProductDto } from '../../application/dtos/product/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/product/update-product.dto';
import { ProductResponseDto } from '../../application/dtos/product/product-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserRole } from '../../domain/entities/user.entity';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Créer un produit' })
  @ApiResponse({ status: 201, description: 'Produit créé', type: ProductResponseDto })
  async create(
    @Body() dto: CreateProductDto,
    @CurrentUser() user: any,
  ): Promise<ProductResponseDto> {
    return this.createProductUseCase.execute(dto, user.id);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Liste tous les produits' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Liste des produits', type: [ProductResponseDto] })
  async findAll(@Query('activeOnly') activeOnly?: string): Promise<ProductResponseDto[]> {
    const active = activeOnly === 'true';
    return this.listProductsUseCase.execute(active);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Mettre à jour un produit' })
  @ApiResponse({ status: 200, description: 'Produit mis à jour', type: ProductResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return this.updateProductUseCase.execute(id, dto);
  }
}
