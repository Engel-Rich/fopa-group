import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_type.dart';

class StockMovementResponseModel {
  final String id;
  final String productId;
  final StockMovementType type;
  final int quantity;
  final double unitPrice;
  final double totalAmount;
  final String? reason;
  final String userId;
  final DateTime createdAt;

  StockMovementResponseModel({
    required this.id,
    required this.productId,
    required this.type,
    required this.quantity,
    required this.unitPrice,
    required this.totalAmount,
    this.reason,
    required this.userId,
    required this.createdAt,
  });

  factory StockMovementResponseModel.fromJson(Map<String, dynamic> json) {
    return StockMovementResponseModel(
      id: json['id'] as String,
      productId: json['productId'] as String,
      type: StockMovementType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => StockMovementType.ENTREE,
      ),
      quantity: json['quantity'] as int,
      unitPrice: (json['unitPrice'] as num).toDouble(),
      totalAmount: (json['totalAmount'] as num).toDouble(),
      reason: json['reason'] as String?,
      userId: json['userId'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'id': id,
      'productId': productId,
      'type': type.name,
      'quantity': quantity,
      'unitPrice': unitPrice,
      'totalAmount': totalAmount,
      'userId': userId,
      'createdAt': createdAt.toIso8601String(),
    };
    if (reason != null) map['reason'] = reason;
    return map;
  }
}
