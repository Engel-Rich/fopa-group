import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PackageTransactionType } from '../../../domain/entities/package-transaction.entity';

export class PackageTransactionResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() customerId: string;
  @ApiProperty({ enum: PackageTransactionType }) type: PackageTransactionType;
  @ApiProperty() quantity: number;
  @ApiProperty() userId: string;
  @ApiPropertyOptional() notes?: string;
  @ApiProperty() createdAt: Date;
}

export class PackagesDebtResponseDto {
  @ApiProperty() customerId: string;
  @ApiProperty() currentPackagesDebt: number;
}
