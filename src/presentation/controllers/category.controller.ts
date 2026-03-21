import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCategoryUseCase } from '../../application/usecases/category/create-category.usecase';
import { ListCategoriesUseCase } from '../../application/usecases/category/list-categories.usecase';
import { CreateCategoryDto } from '../../application/dtos/category/create-category.dto';
import { CategoryResponseDto } from '../../application/dtos/category/category-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../../domain/entities/user.entity';
import { UpdateCategoryDto } from 'src/application/dtos/category/update-category.dto';
import { UpdateCategoryUseCase } from 'src/application/usecases/category/update-category.usecase';
import { DeleteCategoryUseCase } from 'src/application/usecases/category/delete-category.usecase';
@ApiTags('Categories')
@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) { }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Créer une catégorie' })
  @ApiResponse({ status: 201, description: 'Catégorie créée', type: CategoryResponseDto })
  async create(@Body() dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    return this.createCategoryUseCase.execute(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Liste toutes les catégories' })
  @ApiResponse({ status: 200, description: 'Liste des catégories', type: [CategoryResponseDto] })
  async findAll(): Promise<CategoryResponseDto[]> {
    return this.listCategoriesUseCase.execute();
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Mettre à jour une catégorie' })
  @ApiResponse({ status: 200, description: 'Catégorie mise à jour', type: CategoryResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return this.updateCategoryUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Supprimer une catégorie' })
  @ApiResponse({ status: 204, description: 'Catégorie supprimée' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteCategoryUseCase.execute(id);
  }
}
