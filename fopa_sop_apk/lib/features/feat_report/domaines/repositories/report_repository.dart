import 'package:fopa_sop_apk/features/feat_report/datas/models/daily_sales_list_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/monthly_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/yearly_sales_model.dart';

abstract class ReportRepository {
  Future<DailySalesListModel> getDailySales({int page = 1, int limit = 10});
  Future<MonthlySalesModel> getMonthlySales({int? month, int? year});
  Future<YearlySalesModel> getYearlySales({int? year});
}
