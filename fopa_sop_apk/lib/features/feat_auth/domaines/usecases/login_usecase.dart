import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/dtos/login_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/auth_response_model.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/repositories/auth_repository.dart';

class LoginUseCase {
  final AuthRepository authRepository;

  LoginUseCase(this.authRepository);

  Future<AppState<AuthResponseModel>> call(LoginDto loginDto) async {
    try {
      final response = await authRepository.login(loginDto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
