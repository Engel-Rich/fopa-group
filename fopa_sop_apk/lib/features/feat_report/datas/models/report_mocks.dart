import 'package:fopa_sop_apk/features/feat_report/datas/models/daily_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/monthly_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/yearly_sales_model.dart';

class ReportMocks {
  static List<DailySalesModel> getDailySales() {
    final now = DateTime.now();
    return [
      DailySalesModel(
        date: now.subtract(Duration(days: 6)),
        totalSales: 125000.0,
        totalOrders: 45,
        totalAmountPaid: 95000.0,
        totalDebt: 30000.0,
      ),
      DailySalesModel(
        date: now.subtract(Duration(days: 5)),
        totalSales: 180000.0,
        totalOrders: 62,
        totalAmountPaid: 150000.0,
        totalDebt: 30000.0,
      ),
      DailySalesModel(
        date: now.subtract(Duration(days: 4)),
        totalSales: 210000.0,
        totalOrders: 78,
        totalAmountPaid: 180000.0,
        totalDebt: 30000.0,
      ),
      DailySalesModel(
        date: now.subtract(Duration(days: 3)),
        totalSales: 165000.0,
        totalOrders: 55,
        totalAmountPaid: 140000.0,
        totalDebt: 25000.0,
      ),
      DailySalesModel(
        date: now.subtract(Duration(days: 2)),
        totalSales: 195000.0,
        totalOrders: 70,
        totalAmountPaid: 170000.0,
        totalDebt: 25000.0,
      ),
      DailySalesModel(
        date: now.subtract(Duration(days: 1)),
        totalSales: 220000.0,
        totalOrders: 85,
        totalAmountPaid: 200000.0,
        totalDebt: 20000.0,
      ),
      DailySalesModel(
        date: now,
        totalSales: 185000.0,
        totalOrders: 68,
        totalAmountPaid: 165000.0,
        totalDebt: 20000.0,
      ),
    ];
  }

  static List<MonthlySalesModel> getMonthlySales() {
    final now = DateTime.now();
    return [
      MonthlySalesModel(
        month: now.month + 5,
        year: now.year,
        totalSales: 3500000.0,
        totalOrders: 1200,
        totalAmountPaid: 3000000.0,
        totalDebt: 500000.0,
      ),
      MonthlySalesModel(
        month: now.month + 4,
        year: now.year,
        totalSales: 4200000.0,
        totalOrders: 1450,
        totalAmountPaid: 3800000.0,
        totalDebt: 400000.0,
      ),
      MonthlySalesModel(
        month: now.month + 3,
        year: now.year,
        totalSales: 4800000.0,
        totalOrders: 1650,
        totalAmountPaid: 4400000.0,
        totalDebt: 400000.0,
      ),
      MonthlySalesModel(
        month: now.month + 2,
        year: now.year,
        totalSales: 5200000.0,
        totalOrders: 1800,
        totalAmountPaid: 4800000.0,
        totalDebt: 400000.0,
      ),
      MonthlySalesModel(
        month: now.month + 1,
        year: now.year,
        totalSales: 5500000.0,
        totalOrders: 1900,
        totalAmountPaid: 5100000.0,
        totalDebt: 400000.0,
      ),
      MonthlySalesModel(
        month: now.month,
        year: now.year,
        totalSales: 4800000.0,
        totalOrders: 1650,
        totalAmountPaid: 4400000.0,
        totalDebt: 400000.0,
      ),
    ];
  }

  static List<YearlySalesModel> getYearlySales() {
    final now = DateTime.now();
    return [
      YearlySalesModel(
        year: now.year - 2,
        totalSales: 45000000.0,
        totalOrders: 15000,
        totalAmountPaid: 40000000.0,
        totalDebt: 5000000.0,
      ),
      YearlySalesModel(
        year: now.year - 1,
        totalSales: 52000000.0,
        totalOrders: 17500,
        totalAmountPaid: 47000000.0,
        totalDebt: 5000000.0,
      ),
      YearlySalesModel(
        year: now.year,
        totalSales: 48000000.0,
        totalOrders: 16500,
        totalAmountPaid: 44000000.0,
        totalDebt: 4000000.0,
      ),
    ];
  }
}
