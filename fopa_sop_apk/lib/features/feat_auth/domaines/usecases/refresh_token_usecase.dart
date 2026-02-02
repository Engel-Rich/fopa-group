import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/repositories/auth_repository.dart';

class RefreshTokenUseCase {
  final AuthRepository authRepository;

  RefreshTokenUseCase(this.authRepository);

  Future<AppState<String>> call(String refreshToken) async {
    try {
      final accessToken = await authRepository.refreshToken(refreshToken);
      return AppState.completed(accessToken);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
