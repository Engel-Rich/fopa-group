import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_list_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/repositories/stock_repository.dart';

class ListStockMovementsUseCase {
  final StockRepository stockRepository;

  ListStockMovementsUseCase(this.stockRepository);

  Future<AppState<StockMovementListModel>> call({
    required String productId,
    int page = 1,
    int limit = 10,
  }) async {
    try {
      final response = await stockRepository.getProductMovements(
        productId: productId,
        page: page,
        limit: limit,
      );
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
