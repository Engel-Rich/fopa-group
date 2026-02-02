import { ApiProperty } from '@nestjs/swagger';
import { DailySalesDto } from './daily-sales.dto';

export class DailySalesListDto {
  @ApiProperty({ type: [DailySalesDto] })
  dailySales: DailySalesDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
