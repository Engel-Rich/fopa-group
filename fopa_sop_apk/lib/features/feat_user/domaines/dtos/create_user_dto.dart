import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';

class CreateUserDto {
  final String? email;
  final String name;
  final String phone;
  final String username;
  final String password;
  final UserRole role;

  CreateUserDto({
    this.email,
    required this.name,
    required this.phone,
    required this.username,
    required this.password,
    required this.role,
  });

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'name': name,
      'phone': phone,
      'username': username,
      'password': password,
      'role': role.name,
    };
    if (email != null && email!.isNotEmpty) map['email'] = email;
    return map;
  }
}
