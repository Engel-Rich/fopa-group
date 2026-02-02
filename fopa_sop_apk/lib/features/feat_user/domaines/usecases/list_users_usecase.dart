import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/repositories/user_repository.dart';

class ListUsersUseCase {
  final UserRepository userRepository;

  ListUsersUseCase(this.userRepository);

  Future<AppState<List<UserResponseModel>>> call() async {
    try {
      final response = await userRepository.listUsers();
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
