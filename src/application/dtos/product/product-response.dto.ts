import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '../category/category-response.dto';

export class ProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty({ type: CategoryResponseDto, required: false })
  category?: CategoryResponseDto;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
