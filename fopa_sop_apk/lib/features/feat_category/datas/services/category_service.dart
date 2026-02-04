import 'package:dio/dio.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/dtos/create_category_dto.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';

class CategoryService {
  final Dio dio;

  CategoryService(this.dio);

  Future<CategoryResponseModel> createCategory(CreateCategoryDto dto) async {
    try {
      final response = await dio.post('/categories', data: dto.toJson());
      return CategoryResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<CategoryResponseModel> updateCategory(
    String id,
    UpdateCategoryDto dto,
  ) async {
    try {
      final response = await dio.put('/categories/$id', data: dto.toJson());
      return CategoryResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<List<CategoryResponseModel>> listCategories() async {
    try {
      final response = await dio.get('/categories');
      final List<dynamic> data = response.data;
      return data.map((json) => CategoryResponseModel.fromJson(json)).toList();
    } catch (e) {
      rethrow;
    }
  }
}
