import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PackageTransactionType } from '../../../domain/entities/package-transaction.entity';

export class PackageTransactionResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() customerId: string;
  @ApiPropertyOptional() customerName?: string;
  @ApiProperty({ enum: PackageTransactionType }) type: PackageTransactionType;
  @ApiProperty() quantity: number;
  @ApiProperty() userId: string;
  @ApiPropertyOptional() userName?: string;
  @ApiPropertyOptional() notes?: string;
  @ApiProperty() createdAt: Date;
  @ApiPropertyOptional({ description: "Dette d'emballages du client après l'opération" })
  currentPackagesDebt?: number;
}

export class PackagesDebtResponseDto {
  @ApiProperty() customerId: string;
  @ApiProperty() currentPackagesDebt: number;
}

export class PackageDebtorDto {
  @ApiProperty() customerId: string;
  @ApiProperty() name: string;
  @ApiPropertyOptional() phone?: string;
  @ApiPropertyOptional() address?: string;
  @ApiProperty() currentPackagesDebt: number;
}

export class PackagesDebtsSummaryResponseDto {
  @ApiProperty({ description: "Total des emballages actuellement dus par l'ensemble des clients" })
  totalPackagesDebt: number;

  @ApiProperty({ description: "Nombre de clients ayant une dette d'emballages" })
  debtorsCount: number;

  @ApiProperty({ description: "Total cumulé des emballages prêtés" })
  totalLent: number;

  @ApiProperty({ description: "Total cumulé des emballages remboursés" })
  totalReturned: number;

  @ApiProperty({ type: [PackageDebtorDto] })
  customers: PackageDebtorDto[];
}

export class PackageTransactionListResponseDto {
  @ApiProperty({ type: [PackageTransactionResponseDto] })
  data: PackageTransactionResponseDto[];

  @ApiProperty() total: number;
  @ApiProperty() limit: number;
  @ApiProperty() offset: number;
}
