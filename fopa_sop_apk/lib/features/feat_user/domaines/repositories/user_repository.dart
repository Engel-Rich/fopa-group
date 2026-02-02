import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/create_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/update_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';

abstract class UserRepository {
  Future<UserResponseModel> createUser(CreateUserDto dto);
  Future<List<UserResponseModel>> listUsers();
  Future<UserResponseModel> updateUser(String id, UpdateUserDto dto);
  Future<void> deleteUser(String id);
}
