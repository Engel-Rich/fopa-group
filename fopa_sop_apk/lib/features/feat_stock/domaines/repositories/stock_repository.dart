import 'package:fopa_sop_apk/features/feat_stock/datas/dtos/create_stock_entry_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/dtos/create_stock_exit_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_response_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_list_model.dart';

abstract class StockRepository {
  Future<StockMovementResponseModel> createStockEntry(CreateStockEntryDto dto);
  Future<StockMovementResponseModel> createStockExit(CreateStockExitDto dto);
  Future<StockMovementListModel> getProductMovements({
    required String productId,
    int page = 1,
    int limit = 10,
  });
}
