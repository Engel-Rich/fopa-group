import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LendPackagesUseCase } from '../../application/usecases/package/lend-packages.usecase';
import { ReturnPackagesUseCase } from '../../application/usecases/package/return-packages.usecase';
import { GetPackagesDebtUseCase } from '../../application/usecases/package/get-packages-debt.usecase';
import { GetPackagesHistoryUseCase } from '../../application/usecases/package/get-packages-history.usecase';
import { LendPackagesDto } from '../../application/dtos/package/lend-packages.dto';
import { ReturnPackagesDto } from '../../application/dtos/package/return-packages.dto';
import {
  PackageTransactionResponseDto,
  PackagesDebtResponseDto,
} from '../../application/dtos/package/package-transaction-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserRole } from '../../domain/entities/user.entity';

@ApiTags('Packages')
@Controller('packages')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PackageController {
  constructor(
    private readonly lendPackagesUseCase: LendPackagesUseCase,
    private readonly returnPackagesUseCase: ReturnPackagesUseCase,
    private readonly getPackagesDebtUseCase: GetPackagesDebtUseCase,
    private readonly getPackagesHistoryUseCase: GetPackagesHistoryUseCase,
  ) {}

  @Post('lend')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: "Prêter des emballages à un client" })
  @ApiResponse({ status: 201, type: PackageTransactionResponseDto })
  async lend(
    @Body() dto: LendPackagesDto,
    @CurrentUser() user: any,
  ): Promise<PackageTransactionResponseDto> {
    return this.lendPackagesUseCase.execute(dto, user.id);
  }

  @Post('return')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: "Rembourser des emballages d'un client" })
  @ApiResponse({ status: 201, type: PackageTransactionResponseDto })
  async return(
    @Body() dto: ReturnPackagesDto,
    @CurrentUser() user: any,
  ): Promise<PackageTransactionResponseDto> {
    return this.returnPackagesUseCase.execute(dto, user.id);
  }

  @Get('debt/:customerId')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE, UserRole.CLIENT)
  @ApiOperation({ summary: "Obtenir la dette d'emballage d'un client" })
  @ApiResponse({ status: 200, type: PackagesDebtResponseDto })
  async getDebt(@Param('customerId') customerId: string): Promise<PackagesDebtResponseDto> {
    return this.getPackagesDebtUseCase.execute(customerId);
  }

  @Get('history/:customerId')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE, UserRole.CLIENT)
  @ApiOperation({ summary: "Historique des prêts et remboursements d'emballages d'un client" })
  @ApiResponse({ status: 200, type: [PackageTransactionResponseDto] })
  async getHistory(
    @Param('customerId') customerId: string,
  ): Promise<PackageTransactionResponseDto[]> {
    return this.getPackagesHistoryUseCase.execute(customerId);
  }
}
