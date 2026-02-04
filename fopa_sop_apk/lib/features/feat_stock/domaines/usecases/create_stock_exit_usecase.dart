import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/dtos/create_stock_exit_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_response_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/repositories/stock_repository.dart';

class CreateStockExitUseCase {
  final StockRepository stockRepository;

  CreateStockExitUseCase(this.stockRepository);

  Future<AppState<StockMovementResponseModel>> call(
    CreateStockExitDto dto,
  ) async {
    try {
      final response = await stockRepository.createStockExit(dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
