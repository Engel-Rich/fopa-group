import 'package:dio/dio.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/daily_sales_list_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/monthly_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/yearly_sales_model.dart';

class ReportService {
  final Dio dio;

  ReportService(this.dio);

  Future<DailySalesListModel> getDailySales({
    int page = 1,
    int limit = 10,
  }) async {
    try {
      final response = await dio.get(
        '/reports/daily',
        queryParameters: {'page': page, 'limit': limit},
      );
      return DailySalesListModel.fromJson(
        response.data as Map<String, dynamic>,
      );
    } catch (e) {
      rethrow;
    }
  }

  Future<MonthlySalesModel> getMonthlySales({int? month, int? year}) async {
    try {
      final response = await dio.get(
        '/reports/monthly',
        queryParameters: {
          if (month != null) 'month': month,
          if (year != null) 'year': year,
        },
      );
      return MonthlySalesModel.fromJson(response.data as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  Future<YearlySalesModel> getYearlySales({int? year}) async {
    try {
      final response = await dio.get(
        '/reports/yearly',
        queryParameters: year != null ? {'year': year} : null,
      );
      return YearlySalesModel.fromJson(response.data as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }
}
