import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/update_user_dto.dart';

class UpdateCustomerDto {
  final String? address;
  final UpdateUserDto? user;

  UpdateCustomerDto({this.address, this.user});

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{};
    if (address != null) map['address'] = address;
    if (user != null) map['user'] = user!.toJson();
    return map;
  }
}
