import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_response_model.dart';

class StockMovementListModel {
  final List<StockMovementResponseModel> movements;
  final int total;
  final int page;
  final int limit;

  StockMovementListModel({
    required this.movements,
    required this.total,
    required this.page,
    required this.limit,
  });

  factory StockMovementListModel.fromJson(Map<String, dynamic> json) {
    return StockMovementListModel(
      movements: (json['movements'] as List)
          .map(
            (item) => StockMovementResponseModel.fromJson(
              item as Map<String, dynamic>,
            ),
          )
          .toList(),
      total: json['total'] as int,
      page: json['page'] as int,
      limit: json['limit'] as int,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'movements': movements.map((movement) => movement.toJson()).toList(),
      'total': total,
      'page': page,
      'limit': limit,
    };
  }
}
