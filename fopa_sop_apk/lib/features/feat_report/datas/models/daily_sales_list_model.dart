import 'package:fopa_sop_apk/features/feat_report/datas/models/daily_sales_model.dart';

class DailySalesListModel {
  final List<DailySalesModel> dailySales;
  final int total;
  final int page;
  final int limit;

  DailySalesListModel({
    required this.dailySales,
    required this.total,
    required this.page,
    required this.limit,
  });

  factory DailySalesListModel.fromJson(Map<String, dynamic> json) {
    final list = json['dailySales'] as List<dynamic>? ?? [];
    return DailySalesListModel(
      dailySales: list
          .map((e) => DailySalesModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      total: (json['total'] as num?)?.toInt() ?? 0,
      page: (json['page'] as num?)?.toInt() ?? 1,
      limit: (json['limit'] as num?)?.toInt() ?? 10,
    );
  }
}
