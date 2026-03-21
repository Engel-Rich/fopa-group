import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Coca Cola 1.5L' })
  @IsNotEmpty({ message: 'Le nom du produit est requis' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'uuid-category-id' })
  @IsNotEmpty({ message: "L'ID de la catégorie est requis" })
  @IsUUID('4', { message: "L'ID de la catégorie doit être un UUID valide" })
  categoryId: string;

  @ApiProperty({ example: 100, minimum: 0 })
  @IsNotEmpty({ message: 'La quantité est requise' })
  @IsNumber({}, { message: 'La quantité doit être un nombre' })
  @Min(0, { message: 'La quantité ne peut pas être négative' })
  quantity: number;

  @ApiProperty({ example: 1500, minimum: 0 })
  @IsNotEmpty({ message: 'Le prix est requis' })
  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @Min(0, { message: 'Le prix ne peut pas être négatif' })
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
