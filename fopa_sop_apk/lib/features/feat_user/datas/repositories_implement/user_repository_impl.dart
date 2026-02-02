import 'package:fopa_sop_apk/features/feat_user/datas/services/user_service.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/repositories/user_repository.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/create_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/update_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';

class UserRepositoryImpl implements UserRepository {
  final UserService userService;

  UserRepositoryImpl(this.userService);

  @override
  Future<UserResponseModel> createUser(CreateUserDto dto) async {
    return await userService.createUser(dto);
  }

  @override
  Future<List<UserResponseModel>> listUsers() async {
    return await userService.listUsers();
  }

  @override
  Future<UserResponseModel> updateUser(String id, UpdateUserDto dto) async {
    return await userService.updateUser(id, dto);
  }

  @override
  Future<void> deleteUser(String id) async {
    return await userService.deleteUser(id);
  }
}
