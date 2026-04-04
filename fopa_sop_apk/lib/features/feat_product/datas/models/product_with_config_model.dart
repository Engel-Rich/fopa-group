import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';

class ProductWithConfigModel extends ProductResponseModel {
  final double? configuredUnitPrice;
  final double defaultUnitPrice;

  ProductWithConfigModel({
    required super.id,
    required super.name,
    required super.categoryId,
    super.category,
    required super.quantity,
    required super.price,
    super.description,
    required super.isActive,
    super.createdAt,
    super.updatedAt,
    required this.configuredUnitPrice,
    required this.defaultUnitPrice,
  });

  factory ProductWithConfigModel.fromJson(Map<String, dynamic> json) {
    return ProductWithConfigModel(
      id: json['id'] as String,
      name: json['name'] as String,
      quantity: (json['quantity'] as num).toDouble(),
      price: (json['defaultUnitPrice'] ?? json['price']).toDouble(),
      configuredUnitPrice: json['configuredUnitPrice'] != null
          ? (json['configuredUnitPrice'] as num).toDouble()
          : null,
      defaultUnitPrice: (json['defaultUnitPrice'] ?? json['price']).toDouble(),
      categoryId: json['category'] is Map
          ? json["category"]['id']
          : json['categoryId'] as String? ?? '',
      isActive: json['isActive'] ?? true,
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'] as String)
          : null,
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
      category: json['category'] != null && json['category'] is Map
          ? CategoryResponseModel.fromJson(
              json['category'] as Map<String, dynamic>,
            )
          : null,
    );
  }
}
