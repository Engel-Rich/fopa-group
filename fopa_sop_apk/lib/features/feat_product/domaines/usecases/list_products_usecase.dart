import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/repositories/product_repository.dart';

class ListProductsUseCase {
  final ProductRepository productRepository;

  ListProductsUseCase(this.productRepository);

  Future<AppState<List<ProductResponseModel>>> call({bool? activeOnly}) async {
    try {
      final response = await productRepository.listProducts(activeOnly: activeOnly);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
