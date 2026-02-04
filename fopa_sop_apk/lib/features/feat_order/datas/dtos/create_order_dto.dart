import 'package:fopa_sop_apk/features/feat_order/datas/dtos/create_order_item_dto.dart';

class CreateOrderDto {
  final String customerId;
  final List<CreateOrderItemDto> items;
  final double amountPaid;
  final int packages;

  CreateOrderDto({
    required this.customerId,
    required this.items,
    required this.amountPaid,
    this.packages = 0,
  });

  Map<String, dynamic> toJson() {
    return {
      'customerId': customerId,
      'items': items.map((item) => item.toJson()).toList(),
      'amountPaid': amountPaid,
      'packages': packages,
    };
  }
}
