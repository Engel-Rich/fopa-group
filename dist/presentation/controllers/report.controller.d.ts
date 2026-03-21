import { GetDailySalesUseCase } from '../../application/usecases/report/get-daily-sales.usecase';
import { GetMonthlySalesUseCase } from '../../application/usecases/report/get-monthly-sales.usecase';
import { GetYearlySalesUseCase } from '../../application/usecases/report/get-yearly-sales.usecase';
import { DailySalesListDto } from '../../application/dtos/report/daily-sales-list.dto';
import { MonthlySalesDto } from '../../application/dtos/report/monthly-sales.dto';
import { YearlySalesDto } from '../../application/dtos/report/yearly-sales.dto';
export declare class ReportController {
    private readonly getDailySalesUseCase;
    private readonly getMonthlySalesUseCase;
    private readonly getYearlySalesUseCase;
    constructor(getDailySalesUseCase: GetDailySalesUseCase, getMonthlySalesUseCase: GetMonthlySalesUseCase, getYearlySalesUseCase: GetYearlySalesUseCase);
    getDailySales(page?: string, limit?: string): Promise<DailySalesListDto>;
    getMonthlySales(month?: string, year?: string): Promise<MonthlySalesDto>;
    getYearlySales(year?: string): Promise<YearlySalesDto>;
}
