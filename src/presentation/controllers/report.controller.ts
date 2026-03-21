import {
  Controller,
  Get,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GetDailySalesUseCase } from '../../application/usecases/report/get-daily-sales.usecase';
import { GetMonthlySalesUseCase } from '../../application/usecases/report/get-monthly-sales.usecase';
import { GetYearlySalesUseCase } from '../../application/usecases/report/get-yearly-sales.usecase';
import { DailySalesDto } from '../../application/dtos/report/daily-sales.dto';
import { DailySalesListDto } from '../../application/dtos/report/daily-sales-list.dto';
import { MonthlySalesDto } from '../../application/dtos/report/monthly-sales.dto';
import { YearlySalesDto } from '../../application/dtos/report/yearly-sales.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../../domain/entities/user.entity';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ReportController {
  constructor(
    private readonly getDailySalesUseCase: GetDailySalesUseCase,
    private readonly getMonthlySalesUseCase: GetMonthlySalesUseCase,
    private readonly getYearlySalesUseCase: GetYearlySalesUseCase,
  ) {}

  @Get('daily')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Obtenir les ventes quotidiennes paginées' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Liste paginée des ventes quotidiennes', type: DailySalesListDto })
  async getDailySales(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<DailySalesListDto> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      throw new BadRequestException('Les paramètres page et limit doivent être des nombres valides');
    }

    return this.getDailySalesUseCase.execute(pageNumber, limitNumber);
  }

  @Get('monthly')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Obtenir les ventes mensuelles' })
  @ApiQuery({ name: 'month', required: false, type: Number, example: 1, description: 'Mois (1-12). Par défaut: mois en cours' })
  @ApiQuery({ name: 'year', required: false, type: Number, example: 2024, description: 'Année. Par défaut: année en cours' })
  @ApiResponse({ status: 200, description: 'Ventes mensuelles', type: MonthlySalesDto })
  async getMonthlySales(
    @Query('month') month?: string,
    @Query('year') year?: string,
  ): Promise<MonthlySalesDto> {
    const now = new Date();
    const defaultMonth = now.getMonth() + 1; // getMonth() retourne 0-11
    const defaultYear = now.getFullYear();

    let monthNumber: number;
    let yearNumber: number;

    if (month) {
      monthNumber = parseInt(month, 10);
      if (isNaN(monthNumber)) {
        throw new BadRequestException('Le paramètre month doit être un nombre valide');
      }
      if (monthNumber < 1 || monthNumber > 12) {
        throw new BadRequestException('Le mois doit être entre 1 et 12');
      }
    } else {
      monthNumber = defaultMonth;
    }

    if (year) {
      yearNumber = parseInt(year, 10);
      if (isNaN(yearNumber)) {
        throw new BadRequestException('Le paramètre year doit être un nombre valide');
      }
      if (yearNumber < 1900 || yearNumber > 2100) {
        throw new BadRequestException('L\'année doit être entre 1900 et 2100');
      }
    } else {
      yearNumber = defaultYear;
    }

    return this.getMonthlySalesUseCase.execute(monthNumber, yearNumber);
  }

  @Get('yearly')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Obtenir les ventes annuelles' })
  @ApiQuery({ name: 'year', required: false, type: Number, example: 2024, description: 'Année. Par défaut: année en cours' })
  @ApiResponse({ status: 200, description: 'Ventes annuelles', type: YearlySalesDto })
  async getYearlySales(@Query('year') year?: string): Promise<YearlySalesDto> {
    const now = new Date();
    const defaultYear = now.getFullYear();

    let yearNumber: number;

    if (year) {
      yearNumber = parseInt(year, 10);
      if (isNaN(yearNumber)) {
        throw new BadRequestException('Le paramètre year doit être un nombre valide');
      }
      if (yearNumber < 1900 || yearNumber > 2100) {
        throw new BadRequestException('L\'année doit être entre 1900 et 2100');
      }
    } else {
      yearNumber = defaultYear;
    }

    return this.getYearlySalesUseCase.execute(yearNumber);
  }
}
