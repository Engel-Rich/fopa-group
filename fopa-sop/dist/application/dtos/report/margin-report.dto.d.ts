export declare class ProductMarginDto {
    productId: string;
    name: string;
    totalSold: number;
    averageCost: number;
    averageSalePrice: number;
    totalRevenue: number;
    totalCost: number;
    margin: number;
    marginPercentage: number;
}
export declare class MarginReportDto {
    products: ProductMarginDto[];
    totalRevenue: number;
    totalCost: number;
    totalMargin: number;
    averageMarginPercentage: number;
}
