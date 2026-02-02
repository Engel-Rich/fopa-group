class CreateStockExitDto {
  final String productId;
  final int quantity;
  final String reason;

  CreateStockExitDto({
    required this.productId,
    required this.quantity,
    required this.reason,
  });

  Map<String, dynamic> toJson() {
    return {
      'productId': productId,
      'quantity': quantity,
      'reason': reason,
    };
  }
}
