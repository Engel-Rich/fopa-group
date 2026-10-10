import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';

class PackageTransactionListModel {
  final List<PackageTransactionModel> data;
  final int total;
  final int limit;
  final int offset;

  PackageTransactionListModel({
    required this.data,
    required this.total,
    required this.limit,
    required this.offset,
  });

  bool get hasMore => offset + data.length < total;

  factory PackageTransactionListModel.fromJson(Map<String, dynamic> json) {
    return PackageTransactionListModel(
      data: ((json['data'] as List?) ?? [])
          .map(
            (e) => PackageTransactionModel.fromJson(e as Map<String, dynamic>),
          )
          .toList(),
      total: (json['total'] as num? ?? 0).toInt(),
      limit: (json['limit'] as num? ?? 50).toInt(),
      offset: (json['offset'] as num? ?? 0).toInt(),
    );
  }
}
