import 'package:dio/dio.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/dtos/create_stock_entry_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/dtos/create_stock_exit_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_response_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_list_model.dart';

class StockService {
  final Dio dio;

  StockService(this.dio);

  Future<StockMovementResponseModel> createStockEntry(
    CreateStockEntryDto dto,
  ) async {
    try {
      final response = await dio.post('/stock/entry', data: dto.toJson());
      return StockMovementResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<StockMovementResponseModel> createStockExit(
    CreateStockExitDto dto,
  ) async {
    try {
      final response = await dio.post('/stock/exit', data: dto.toJson());
      return StockMovementResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<StockMovementListModel> getProductMovements({
    required String productId,
    int page = 1,
    int limit = 10,
  }) async {
    try {
      final response = await dio.get(
        '/stock/product/$productId/movements',
        queryParameters: {'page': page, 'limit': limit},
      );
      return StockMovementListModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
