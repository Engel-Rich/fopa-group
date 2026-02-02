import 'package:fopa_sop_apk/features/feat_auth/domaines/dtos/login_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/dtos/register_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/auth_response_model.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';

abstract class AuthRepository {
  Future<AuthResponseModel> login(LoginDto loginDto);
  Future<AuthResponseModel> register(RegisterUserDto registerDto);
  Future<String> refreshToken(String refreshToken);
  Future<UserModel> getCurrentUser();
  Future<void> logout();
}
