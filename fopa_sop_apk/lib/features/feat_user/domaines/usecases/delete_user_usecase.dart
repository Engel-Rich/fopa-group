import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/repositories/user_repository.dart';

class DeleteUserUseCase {
  final UserRepository userRepository;

  DeleteUserUseCase(this.userRepository);

  Future<AppState<void>> call(String id) async {
    try {
      await userRepository.deleteUser(id);
      return AppState.completed(null);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
