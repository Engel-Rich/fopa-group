import { ApiProperty } from '@nestjs/swagger';

export class DailySalesDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  totalSales: number;

  @ApiProperty()
  totalOrders: number;

  @ApiProperty()
  totalAmountPaid: number;

  @ApiProperty()
  totalDebt: number;
}
