import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-customer-id' })
  @IsNotEmpty({ message: "L'ID du client est requis" })
  @IsUUID('4', { message: "L'ID du client doit être un UUID valide" })
  customerId: string;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray({ message: 'Les articles sont requis' })
  @IsNotEmpty({ message: 'Au moins un article est requis' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  // montant paye par le client
  @ApiProperty({ example: 5000, minimum: 0.01 })
  @IsNotEmpty({ message: 'Le montant payé est requis' })
  @IsNumber({}, { message: 'Le montant payé doit être un nombre' })
  amountPaid: number;

  // nombre d'emballages (facultatif, défaut 0)
  @ApiPropertyOptional({ example: 0, minimum: 0, description: 'Nombre d\'emballages' })
  @IsOptional()
  @IsInt({ message: 'Le nombre d\'emballages doit être un entier' })
  @Min(0, { message: 'Le nombre d\'emballages doit être supérieur ou égal à 0' })
  packages?: number = 0;
}
