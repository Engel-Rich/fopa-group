class CreateProductDto {
  final String name;
  final String categoryId;
  final double quantity;
  final double price;
  final String? description;

  CreateProductDto({
    required this.name,
    required this.categoryId,
    required this.quantity,
    required this.price,
    this.description,
  });

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'name': name,
      'categoryId': categoryId,
      'quantity': quantity,
      'price': price,
    };
    if (description != null) map['description'] = description;
    return map;
  }
}
