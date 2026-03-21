import { ApiProperty } from '@nestjs/swagger';
import { StockMovementType } from '../../../domain/entities/stock-movement.entity';

export class StockMovementResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty({ enum: StockMovementType })
  type: StockMovementType;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty({ required: false })
  reason?: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;
}
