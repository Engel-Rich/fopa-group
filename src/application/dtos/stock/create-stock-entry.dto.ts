import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateStockEntryDto {
  @ApiProperty({ example: 'uuid-product-id' })
  @IsNotEmpty({ message: "L'ID du produit est requis" })
  @IsUUID('4', { message: "L'ID du produit doit être un UUID valide" })
  productId: string;

  @ApiProperty({ example: 50, minimum: 1 })
  @IsNotEmpty({ message: 'La quantité est requise' })
  @IsNumber({}, { message: 'La quantité doit être un nombre' })
  @Min(1, { message: 'La quantité doit être supérieure à 0' })
  quantity: number;

  @ApiProperty({ example: 1200, minimum: 0 })
  @IsNotEmpty({ message: 'Le prix unitaire est requis' })
  @IsNumber({}, { message: 'Le prix unitaire doit être un nombre' })
  @Min(0, { message: 'Le prix unitaire ne peut pas être négatif' })
  unitPrice: number;
}
