import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';

class ProductResponseModel {
  final String id;
  final String name;
  final String categoryId;
  final CategoryResponseModel? category;
  final double quantity;
  final double price;
  final String? description;
  final bool isActive;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  ProductResponseModel({
    required this.id,
    required this.name,
    required this.categoryId,
    this.category,
    required this.quantity,
    required this.price,
    this.description,
    required this.isActive,
    this.createdAt,
    this.updatedAt,
  });

  factory ProductResponseModel.fromJson(Map<String, dynamic> json) {
    return ProductResponseModel(
      id: json['id'] as String,
      name: json['name'] as String,
      categoryId: json['categoryId'] as String,
      category: json['category'] != null
          ? CategoryResponseModel.fromJson(
              json['category'] as Map<String, dynamic>,
            )
          : null,
      quantity: (json['quantity'] as num).toDouble(),
      price: (json['price'] as num).toDouble(),
      description: json['description'] as String?,
      isActive: json['isActive'] as bool? ?? true,
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'] as String)
          : null,
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'id': id,
      'name': name,
      'categoryId': categoryId,
      'quantity': quantity,
      'price': price,
      'isActive': isActive,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
    if (description != null) map['description'] = description;
    if (category != null) map['category'] = category!.toJson();
    return map;
  }
}
