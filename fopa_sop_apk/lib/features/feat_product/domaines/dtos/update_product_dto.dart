class UpdateProductDto {
  final String? name;
  final String? categoryId;

  final double? price;
  final String? description;
  final bool? isActive;

  UpdateProductDto({
    this.name,
    this.categoryId,

    this.price,
    this.description,
    this.isActive,
  });

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{};
    if (name != null) map['name'] = name;
    if (categoryId != null) map['categoryId'] = categoryId;

    if (price != null) map['price'] = price;
    if (description != null) map['description'] = description;
    if (isActive != null) map['isActive'] = isActive;
    return map;
  }
}
