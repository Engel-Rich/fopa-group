import { ApiProperty } from '@nestjs/swagger';
import { OrderResponseDto } from './order-response.dto';

export class OrderListDto {
  @ApiProperty({ type: [OrderResponseDto] })
  orders: OrderResponseDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
