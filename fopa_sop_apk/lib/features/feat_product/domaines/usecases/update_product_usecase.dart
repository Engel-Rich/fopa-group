import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/dtos/update_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/repositories/product_repository.dart';

class UpdateProductUseCase {
  final ProductRepository productRepository;

  UpdateProductUseCase(this.productRepository);

  Future<AppState<ProductResponseModel>> call(
    String id,
    UpdateProductDto dto,
  ) async {
    try {
      final response = await productRepository.updateProduct(id, dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
