import 'package:fopa_sop_apk/features/feat_auth/domaines/dtos/login_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/services/auth_service.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/repositories/auth_repository.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/dtos/register_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/auth_response_model.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthService authService;

  AuthRepositoryImpl(this.authService);

  @override
  Future<AuthResponseModel> login(LoginDto loginDto) async {
    return await authService.login(loginDto);
  }

  @override
  Future<AuthResponseModel> register(RegisterUserDto registerDto) async {
    return await authService.register(registerDto);
  }

  @override
  Future<String> refreshToken(String refreshToken) async {
    return await authService.refreshToken(refreshToken);
  }

  @override
  Future<UserModel> getCurrentUser() async {
    return await authService.getCurrentUser();
  }

  @override
  Future<void> logout() async {
    await authService.logout();
  }
}
