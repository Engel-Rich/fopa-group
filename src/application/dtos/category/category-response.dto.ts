import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiPropertyOptional({ required: false })
  createdAt?: Date;

  @ApiPropertyOptional({ required: false })
  updatedAt?: Date;
}
