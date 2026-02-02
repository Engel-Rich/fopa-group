import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/repositories/auth_repository.dart';

class GetCurrentUserUseCase {
  final AuthRepository authRepository;

  GetCurrentUserUseCase(this.authRepository);

  Future<AppState<UserModel>> call() async {
    try {
      final response = await authRepository.getCurrentUser();
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
