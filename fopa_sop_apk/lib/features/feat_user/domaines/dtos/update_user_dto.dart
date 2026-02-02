import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';

class UpdateUserDto {
  final String? email;
  final String? name;
  final String? phone;
  final String? username;
  final String? password;
  final UserRole? role;
  final bool? isActive;

  UpdateUserDto({
    this.email,
    this.name,
    this.phone,
    this.username,
    this.password,
    this.role,
    this.isActive,
  });

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{};
    if (email != null) map['email'] = email;
    if (name != null) map['name'] = name;
    if (phone != null) map['phone'] = phone;
    if (username != null) map['username'] = username;
    if (password != null) map['password'] = password;
    if (role != null) map['role'] = role!.name;
    if (isActive != null) map['isActive'] = isActive;
    return map;
  }
}
