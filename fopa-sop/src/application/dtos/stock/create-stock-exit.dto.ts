import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateStockExitDto {
  @ApiProperty({ example: 'uuid-product-id' })
  @IsNotEmpty({ message: "L'ID du produit est requis" })
  @IsUUID('4', { message: "L'ID du produit doit être un UUID valide" })
  productId: string;

  @ApiProperty({ example: 10, minimum: 1 })
  @IsNotEmpty({ message: 'La quantité est requise' })
  @IsNumber({}, { message: 'La quantité doit être un nombre' })
  @Min(1, { message: 'La quantité doit être supérieure à 0' })
  quantity: number;

  @ApiProperty({ example: 'Produit périmé' })
  @IsNotEmpty({ message: 'Le motif est requis pour une sortie de stock' })
  @IsString()
  reason: string;
}
