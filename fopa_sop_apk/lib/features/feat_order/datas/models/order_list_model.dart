import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';

class OrderListModel {
  final List<OrderResponseModel> orders;
  final int total;
  final int page;
  final int limit;

  OrderListModel({
    required this.orders,
    required this.total,
    required this.page,
    required this.limit,
  });

  factory OrderListModel.fromJson(Map<String, dynamic> json) {
    return OrderListModel(
      orders: (json['orders'] as List)
          .map(
            (order) =>
                OrderResponseModel.fromJson(order as Map<String, dynamic>),
          )
          .toList(),
      total: json['total'] as int,
      page: json['page'] as int,
      limit: json['limit'] as int,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'orders': orders.map((order) => order.toJson()).toList(),
      'total': total,
      'page': page,
      'limit': limit,
    };
  }
}
