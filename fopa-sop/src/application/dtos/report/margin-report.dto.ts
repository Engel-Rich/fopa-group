import { ApiProperty } from '@nestjs/swagger';

export class ProductMarginDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  totalSold: number;

  @ApiProperty()
  averageCost: number;

  @ApiProperty()
  averageSalePrice: number;

  @ApiProperty()
  totalRevenue: number;

  @ApiProperty()
  totalCost: number;

  @ApiProperty()
  margin: number;

  @ApiProperty()
  marginPercentage: number;
}

export class MarginReportDto {
  @ApiProperty({ type: [ProductMarginDto] })
  products: ProductMarginDto[];

  @ApiProperty()
  totalRevenue: number;

  @ApiProperty()
  totalCost: number;

  @ApiProperty()
  totalMargin: number;

  @ApiProperty()
  averageMarginPercentage: number;
}
