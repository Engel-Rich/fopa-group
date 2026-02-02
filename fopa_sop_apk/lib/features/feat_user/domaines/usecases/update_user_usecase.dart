import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/update_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/repositories/user_repository.dart';

class UpdateUserUseCase {
  final UserRepository userRepository;

  UpdateUserUseCase(this.userRepository);

  Future<AppState<UserResponseModel>> call(String id, UpdateUserDto dto) async {
    try {
      final response = await userRepository.updateUser(id, dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
