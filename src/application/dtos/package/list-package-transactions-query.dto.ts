import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { PackageTransactionType } from '../../../domain/entities/package-transaction.entity';

export class ListPackageTransactionsQueryDto {
  @ApiPropertyOptional({ enum: PackageTransactionType })
  @IsOptional()
  @IsEnum(PackageTransactionType, { message: 'Le type doit être LEND ou RETURN' })
  type?: PackageTransactionType;

  @ApiPropertyOptional({ example: '2026-04-01' })
  @IsOptional()
  @IsDateString({}, { message: 'La date de début doit être une date valide' })
  from?: string;

  @ApiPropertyOptional({ example: '2026-04-30' })
  @IsOptional()
  @IsDateString({}, { message: 'La date de fin doit être une date valide' })
  to?: string;

  @ApiPropertyOptional({ example: 50, default: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  limit?: number;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;
}
