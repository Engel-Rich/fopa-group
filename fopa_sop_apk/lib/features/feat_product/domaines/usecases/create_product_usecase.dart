import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/dtos/create_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/repositories/product_repository.dart';

class CreateProductUseCase {
  final ProductRepository productRepository;

  CreateProductUseCase(this.productRepository);

  Future<AppState<ProductResponseModel>> call(CreateProductDto dto) async {
    try {
      final response = await productRepository.createProduct(dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
