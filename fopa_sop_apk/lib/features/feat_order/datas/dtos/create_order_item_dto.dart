class CreateOrderItemDto {
  final String productId;
  final int quantity;
  final double unitPrice;

  CreateOrderItemDto({
    required this.productId,
    required this.quantity,
    required this.unitPrice,
  });

  Map<String, dynamic> toJson() {
    return {
      'productId': productId,
      'quantity': quantity,
      'unitPrice': unitPrice,
    };
  }
}
