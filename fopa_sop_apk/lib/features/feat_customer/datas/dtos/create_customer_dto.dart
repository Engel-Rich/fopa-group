import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/create_user_dto.dart';

class CreateCustomerDto {
  final CreateUserDto user;
  final String? address;

  CreateCustomerDto({required this.user, this.address});

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{'user': user.toJson()};
    if (address != null) map['address'] = address;
    return map;
  }
}
