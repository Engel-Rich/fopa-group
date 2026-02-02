enum UserRole { ADMIN, CAISSIERE, CLIENT }

class UserModel {
  final String id;
  final String? email;
  final String name;
  final String? phone;
  final String username;
  final UserRole role;
  final bool isActive;

  UserModel({
    required this.id,
    this.email,
    required this.name,
    this.phone,
    required this.username,
    required this.role,
    required this.isActive,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String,
      email: json['email'] as String?,
      name: json['name'] as String,
      phone: json['phone'] as String?,
      username: json['username'] as String,
      role: UserRole.values.firstWhere(
        (e) => e.name == json['role'],
        orElse: () => UserRole.CLIENT,
      ),
      isActive: json['isActive'] as bool? ?? true,
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
    };
  }
}
