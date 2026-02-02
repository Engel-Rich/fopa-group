import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/create_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/repositories/user_repository.dart';

class CreateUserUseCase {
  final UserRepository userRepository;

  CreateUserUseCase(this.userRepository);

  Future<AppState<UserResponseModel>> call(CreateUserDto dto) async {
    try {
      final response = await userRepository.createUser(dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
