import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';

class UserResponseModel {
  final String id;
  final String? email;
  final String name;
  final String? phone;
  final String username;
  final UserRole role;
  final bool? isActive;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  UserResponseModel({
    required this.id,
    this.email,
    required this.name,
    this.phone,
    required this.username,
    required this.role,
    this.isActive,
    this.createdAt,
    this.updatedAt,
  });

  factory UserResponseModel.fromJson(Map<String, dynamic> json) {
    return UserResponseModel(
      id: json['id'] as String,
      email: json['email'] as String?,
      name: json['name'] as String,
      phone: json['phone'] as String?,
      username: json['username'] as String,
      role: UserRole.values.firstWhere(
        (e) => e.name == json['role'],
        orElse: () => UserRole.CLIENT,
      ),
      isActive: json['isActive'] as bool?,
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'] as String)
          : null,
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'phone': phone,
      'username': username,
      'role': role.name,
      'isActive': isActive,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}
