import 'package:flutter/foundation.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/dtos/create_stock_entry_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/dtos/create_stock_exit_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_response_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_list_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/usecases/create_stock_entry_usecase.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/usecases/create_stock_exit_usecase.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/usecases/list_stock_movements_usecase.dart';

class StockProvider extends ChangeNotifier {
  final CreateStockEntryUseCase createStockEntryUseCase;
  final CreateStockExitUseCase createStockExitUseCase;
  final ListStockMovementsUseCase listStockMovementsUseCase;

  AppState<StockMovementResponseModel> createStockEntryState = AppState();
  AppState<StockMovementResponseModel> createStockExitState = AppState();
  AppState<StockMovementListModel> listStockMovementsState = AppState();

  StockProvider({
    required this.createStockEntryUseCase,
    required this.createStockExitUseCase,
    required this.listStockMovementsUseCase,
  });

  Future<void> createStockEntry(CreateStockEntryDto dto) async {
    createStockEntryState = AppState.loading();
    notifyListeners();

    createStockEntryState = await createStockEntryUseCase.call(dto);
    notifyListeners();
  }

  Future<void> createStockExit(CreateStockExitDto dto) async {
    createStockExitState = AppState.loading();
    notifyListeners();

    createStockExitState = await createStockExitUseCase.call(dto);
    notifyListeners();
  }

  Future<void> getProductMovements({
    required String productId,
    int page = 1,
    int limit = 100,
  }) async {
    listStockMovementsState = AppState.loading();
    notifyListeners();

    listStockMovementsState = await listStockMovementsUseCase.call(
      productId: productId,
      page: page,
      limit: limit,
    );
    notifyListeners();
  }
}
