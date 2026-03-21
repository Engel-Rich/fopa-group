import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID('4', { message: "L'ID de la catégorie doit être un UUID valide" })
  categoryId?: string;

  // @ApiProperty({ required: false, minimum: 0 })
  // @IsOptional()
  // @IsNumber({}, { message: 'La quantité doit être un nombre' })
  // @Min(0, { message: 'La quantité ne peut pas être négative' })
  // quantity?: number;

  @ApiProperty({ required: false, minimum: 0 })
  @IsOptional()
  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @Min(0, { message: 'Le prix ne peut pas être négatif' })
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  isActive?: boolean;
}
