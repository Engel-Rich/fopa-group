import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ example: 'uuid-product-id' })
  @IsNotEmpty({ message: "L'ID du produit est requis" })
  @IsUUID('4', { message: "L'ID du produit doit être un UUID valide" })
  productId: string;

  @ApiProperty({ example: 2, minimum: 1 })
  @IsNotEmpty({ message: 'La quantité est requise' })
  @IsNumber({}, { message: 'La quantité doit être un nombre' })
  @Min(1, { message: 'La quantité doit être supérieure à 0' })
  quantity: number;

  @ApiProperty({ example: 1000, minimum: 0.01, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Le prix unitaire doit être un nombre' })
  @Min(0.01, { message: 'Le prix unitaire doit être supérieur à 0' })
  unitPrice?: number;
}
