import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateStockEntryUseCase } from '../../application/usecases/stock/create-stock-entry.usecase';
import { CreateStockExitUseCase } from '../../application/usecases/stock/create-stock-exit.usecase';
import { ListStockMovementsUseCase } from '../../application/usecases/stock/list-stock-movements.usecase';
import { CreateStockEntryDto } from '../../application/dtos/stock/create-stock-entry.dto';
import { CreateStockExitDto } from '../../application/dtos/stock/create-stock-exit.dto';
import { StockMovementResponseDto } from '../../application/dtos/stock/stock-movement-response.dto';
import { StockMovementListDto } from '../../application/dtos/stock/stock-movement-list.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserRole } from '../../domain/entities/user.entity';

@ApiTags('Stock')
@Controller('stock')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class StockController {
  constructor(
    private readonly createStockEntryUseCase: CreateStockEntryUseCase,
    private readonly createStockExitUseCase: CreateStockExitUseCase,
    private readonly listStockMovementsUseCase: ListStockMovementsUseCase,
  ) { }

  @Post('entry')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Créer une entrée de stock' })
  @ApiResponse({ status: 201, description: 'Entrée de stock créée', type: StockMovementResponseDto })
  async createEntry(
    @Body() dto: CreateStockEntryDto,
    @CurrentUser() user: any,
  ): Promise<StockMovementResponseDto> {
    return this.createStockEntryUseCase.execute(dto, user.id);
  }

  @Post('exit')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Créer une sortie de stock' })
  @ApiResponse({ status: 201, description: 'Sortie de stock créée', type: StockMovementResponseDto })
  async createExit(
    @Body() dto: CreateStockExitDto,
    @CurrentUser() user: any,
  ): Promise<StockMovementResponseDto> {
    return this.createStockExitUseCase.execute(dto, user.id);
  }

  @Get('product/:productId/movements')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Récupérer les mouvements de stock d\'un produit (paginé)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numéro de page (défaut: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page (défaut: 10)' })
  @ApiResponse({ status: 200, description: 'Liste paginée des mouvements de stock', type: StockMovementListDto })
  async getProductMovements(
    @Param('productId') productId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<StockMovementListDto> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.listStockMovementsUseCase.execute(productId, pageNumber, limitNumber);
  }
}
