import 'package:dio/dio.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/dtos/create_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/dtos/update_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';

class ProductService {
  final Dio dio;

  ProductService(this.dio);

  Future<ProductResponseModel> createProduct(CreateProductDto dto) async {
    try {
      final response = await dio.post('/products', data: dto.toJson());
      return ProductResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<List<ProductResponseModel>> listProducts({bool? activeOnly}) async {
    try {
      final queryParams = activeOnly != null
          ? {'activeOnly': activeOnly.toString()}
          : null;
      final response = await dio.get('/products', queryParameters: queryParams);
      final List<dynamic> data = response.data;
      return data.map((json) => ProductResponseModel.fromJson(json)).toList();
    } catch (e) {
      rethrow;
    }
  }

  Future<ProductResponseModel> updateProduct(
    String id,
    UpdateProductDto dto,
  ) async {
    try {
      final response = await dio.put('/products/$id', data: dto.toJson());
      return ProductResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
