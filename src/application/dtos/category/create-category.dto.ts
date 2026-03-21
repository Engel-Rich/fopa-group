import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Eaux' })
  @IsNotEmpty({ message: 'Le nom de la catégorie est requis' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Eaux minérales et gazeuses', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
