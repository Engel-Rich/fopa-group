import 'package:fopa_sop_apk/features/feat_product/datas/services/product_service.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/repositories/product_repository.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/dtos/create_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/dtos/update_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';

class ProductRepositoryImpl implements ProductRepository {
  final ProductService productService;

  ProductRepositoryImpl(this.productService);

  @override
  Future<ProductResponseModel> createProduct(CreateProductDto dto) async {
    return await productService.createProduct(dto);
  }

  @override
  Future<List<ProductResponseModel>> listProducts({bool? activeOnly}) async {
    return await productService.listProducts(activeOnly: activeOnly);
  }

  @override
  Future<ProductResponseModel> updateProduct(
    String id,
    UpdateProductDto dto,
  ) async {
    return await productService.updateProduct(id, dto);
  }
}
