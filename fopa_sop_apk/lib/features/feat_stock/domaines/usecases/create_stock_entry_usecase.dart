import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/dtos/create_stock_entry_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_response_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/repositories/stock_repository.dart';

class CreateStockEntryUseCase {
  final StockRepository stockRepository;

  CreateStockEntryUseCase(this.stockRepository);

  Future<AppState<StockMovementResponseModel>> call(
    CreateStockEntryDto dto,
  ) async {
    try {
      final response = await stockRepository.createStockEntry(dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
