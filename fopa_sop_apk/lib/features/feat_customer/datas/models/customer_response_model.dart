import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';

class CustomerResponseModel {
  final String id;
  final String userId;
  final UserResponseModel? user;
  final String? address;
  final double currentDebt;
  final int currentPackagesDebt;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  CustomerResponseModel({
    required this.id,
    required this.userId,
    this.user,
    this.address,
    required this.currentDebt,
    required this.currentPackagesDebt,
    this.createdAt,
    this.updatedAt,
  });

  factory CustomerResponseModel.fromJson(Map<String, dynamic> json) {
    return CustomerResponseModel(
      id: json['id'] as String,
      userId: json['userId'] as String,
      user: json['user'] != null
          ? UserResponseModel.fromJson(json['user'] as Map<String, dynamic>)
          : null,
      address: json['address'] as String?,
      currentDebt: (json['currentDebt'] as num).toDouble(),
      currentPackagesDebt: (json['currentPackagesDebt'] as num).toInt(),
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
      'userId': userId,
      'currentDebt': currentDebt,
      'currentPackagesDebt': currentPackagesDebt,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
    if (user != null) map['user'] = user!.toJson();
    if (address != null) map['address'] = address;
    return map;
  }
}
