import 'package:fopa_sop_apk/features/feat_report/datas/models/daily_sales_list_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/monthly_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/yearly_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/services/report_service.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/repositories/report_repository.dart';

class ReportRepositoryImpl implements ReportRepository {
  final ReportService reportService;

  ReportRepositoryImpl(this.reportService);

  @override
  Future<DailySalesListModel> getDailySales({
    int page = 1,
    int limit = 10,
  }) async {
    return reportService.getDailySales(page: page, limit: limit);
  }

  @override
  Future<MonthlySalesModel> getMonthlySales({int? month, int? year}) async {
    return reportService.getMonthlySales(month: month, year: year);
  }

  @override
  Future<YearlySalesModel> getYearlySales({int? year}) async {
    return reportService.getYearlySales(year: year);
  }
}
