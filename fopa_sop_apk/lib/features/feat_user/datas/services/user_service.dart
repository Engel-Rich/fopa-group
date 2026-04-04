import 'package:dio/dio.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/create_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/update_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';

class UserService {
  final Dio dio;

  UserService(this.dio);

  Future<UserResponseModel> createUser(CreateUserDto dto) async {
    try {
      final response = await dio.post('/users', data: dto.toJson());
      return UserResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<List<UserResponseModel>> listUsers() async {
    try {
      final response = await dio.get('/users');
      final List<dynamic> data = response.data;
      return data.map((json) => UserResponseModel.fromJson(json)).toList();
    } catch (e) {
      rethrow;
    }
  }

  Future<UserResponseModel> updateUser(String id, UpdateUserDto dto) async {
    try {
      final response = await dio.put('/users/$id', data: dto.toJson());
      return UserResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<void> deleteUser(String id) async {
    try {
      await dio.delete('/users/$id');
    } catch (e) {
      rethrow;
    }
  }

  // Future<int> signOut() async {
  //   try {
  //     final response = await dio.delete('/auth/logout');
  //     return response.statusCode ?? 200;
  //   } catch (e) {
  //     rethrow;
  //   }
  // }
}
