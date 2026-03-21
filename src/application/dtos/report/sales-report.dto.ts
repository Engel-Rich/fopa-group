import { ApiProperty } from '@nestjs/swagger';

export class SalesReportDto {
  @ApiProperty()
  totalSales: number;

  @ApiProperty()
  totalOrders: number;

  @ApiProperty()
  totalAmountPaid: number;

  @ApiProperty()
  totalDebt: number;

  @ApiProperty()
  averageOrderValue: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}
