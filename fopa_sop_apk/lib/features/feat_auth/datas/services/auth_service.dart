import 'package:dio/dio.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/dtos/login_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/dtos/refresh_token_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/dtos/register_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/auth_response_model.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';

class AuthService {
  final Dio dio;

  AuthService(this.dio);

  Future<AuthResponseModel> login(LoginDto loginDto) async {
    try {
      final response = await dio.post('/auth/login', data: loginDto.toJson());
      return AuthResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<AuthResponseModel> register(RegisterUserDto registerDto) async {
    try {
      final response = await dio.post(
        '/auth/register',
        data: registerDto.toJson(),
      );
      return AuthResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<String> refreshToken(String refreshToken) async {
    try {
      final response = await dio.post(
        '/auth/refresh',
        data: RefreshTokenDto(refreshToken: refreshToken).toJson(),
      );
      final authResponse = AuthResponseModel.fromJson(response.data);
      return authResponse.accessToken;
    } catch (e) {
      rethrow;
    }
  }

  Future<UserModel> getCurrentUser() async {
    try {
      final response = await dio.get('/auth/me');
      return UserModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<void> logout() async {
    try {
      await dio.post('/auth/logout');
    } catch (e) {
      rethrow;
    }
  }
}
