import 'package:fopa_sop_apk/features/feat_stock/datas/services/stock_service.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/repositories/stock_repository.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/dtos/create_stock_entry_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/dtos/create_stock_exit_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_response_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_list_model.dart';

class StockRepositoryImpl implements StockRepository {
  final StockService stockService;

  StockRepositoryImpl(this.stockService);

  @override
  Future<StockMovementResponseModel> createStockEntry(
    CreateStockEntryDto dto,
  ) async {
    return await stockService.createStockEntry(dto);
  }

  @override
  Future<StockMovementResponseModel> createStockExit(
    CreateStockExitDto dto,
  ) async {
    return await stockService.createStockExit(dto);
  }

  @override
  Future<StockMovementListModel> getProductMovements({
    required String productId,
    int page = 1,
    int limit = 10,
  }) async {
    return await stockService.getProductMovements(
      productId: productId,
      page: page,
      limit: limit,
    );
  }
}
