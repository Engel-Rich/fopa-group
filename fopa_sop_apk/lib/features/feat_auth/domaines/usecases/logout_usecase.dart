import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/repositories/auth_repository.dart';

class LogoutUseCase {
  final AuthRepository authRepository;

  LogoutUseCase(this.authRepository);

  Future<AppState<void>> call() async {
    try {
      await authRepository.logout();
      return AppState.completed(null);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
