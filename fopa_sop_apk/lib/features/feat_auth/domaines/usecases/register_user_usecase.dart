import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/dtos/register_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/auth_response_model.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/repositories/auth_repository.dart';

class RegisterUserUseCase {
  final AuthRepository authRepository;

  RegisterUserUseCase(this.authRepository);

  Future<AppState<AuthResponseModel>> call(RegisterUserDto registerDto) async {
    try {
      final response = await authRepository.register(registerDto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
