import 'package:fopa_sop_apk/features/feat_product/domaines/dtos/create_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/dtos/update_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';

abstract class ProductRepository {
  Future<ProductResponseModel> createProduct(CreateProductDto dto);
  Future<List<ProductResponseModel>> listProducts({bool? activeOnly});
  Future<ProductResponseModel> updateProduct(String id, UpdateProductDto dto);
}
