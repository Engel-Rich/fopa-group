class OrderItemResponseModel {
  final String id;
  final String orderId;
  final String productId;
  final String name;
  final int quantity;
  final double unitPrice;
  final double subtotal;
  final DateTime createdAt;

  OrderItemResponseModel({
    required this.id,
    required this.orderId,
    required this.productId,
    required this.name,
    required this.quantity,
    required this.unitPrice,
    required this.subtotal,
    required this.createdAt,
  });

  factory OrderItemResponseModel.fromJson(Map<String, dynamic> json) {
    return OrderItemResponseModel(
      id: json['id'] as String,
      orderId: json['orderId'] as String,
      productId: json['productId'] as String,
      name: json['name'] as String,
      quantity: json['quantity'] as int,
      unitPrice: (json['unitPrice'] as num).toDouble(),
      subtotal: (json['subtotal'] as num).toDouble(),
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'orderId': orderId,
      'productId': productId,
      'name': name,
      'quantity': quantity,
      'price': unitPrice,
      'subtotal': subtotal,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
