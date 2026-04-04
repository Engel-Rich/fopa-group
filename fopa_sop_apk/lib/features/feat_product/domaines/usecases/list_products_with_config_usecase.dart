import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_with_config_model.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/repositories/product_repository.dart';

class ListProductsWithConfigUseCase {
  final ProductRepository productRepository;

  ListProductsWithConfigUseCase(this.productRepository);

  Future<AppState<List<ProductWithConfigModel>>> call(
    String customerId, {
    bool? activeOnly,
  }) async {
    try {
      final response = await productRepository.listProductsWithConfig(
        customerId,
        activeOnly: activeOnly,
      );
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
