import 'package:fopa_sop_apk/features/feat_product/datas/dtos/create_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/dtos/update_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_with_config_model.dart';

abstract class ProductRepository {
  Future<ProductResponseModel> createProduct(CreateProductDto dto);
  Future<List<ProductResponseModel>> listProducts({bool? activeOnly});
  Future<List<ProductWithConfigModel>> listProductsWithConfig(
    String customerId, {
    bool? activeOnly,
  });
  Future<ProductResponseModel> updateProduct(String id, UpdateProductDto dto);
}
