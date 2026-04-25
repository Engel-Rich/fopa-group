class ReturnPackagesDto {
  final String customerId;
  final int quantity;
  final String? notes;

  ReturnPackagesDto({
    required this.customerId,
    required this.quantity,
    this.notes,
  });

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'customerId': customerId,
      'quantity': quantity,
    };
    if (notes != null) map['notes'] = notes;
    return map;
  }
}
