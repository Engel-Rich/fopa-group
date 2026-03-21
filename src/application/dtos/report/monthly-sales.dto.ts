import { ApiProperty } from '@nestjs/swagger';

export class MonthlySalesDto {
  @ApiProperty()
  month: number;

  @ApiProperty()
  year: number;

  @ApiProperty()
  totalSales: number;

  @ApiProperty()
  totalOrders: number;

  @ApiProperty()
  totalAmountPaid: number;

  @ApiProperty()
  totalDebt: number;
}
