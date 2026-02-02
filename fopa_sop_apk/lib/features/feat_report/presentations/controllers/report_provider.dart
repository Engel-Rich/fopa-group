import 'package:flutter/foundation.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/daily_sales_list_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/daily_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/monthly_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/yearly_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/usecases/get_daily_sales_usecase.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/usecases/get_monthly_sales_usecase.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/usecases/get_yearly_sales_usecase.dart';

class ReportProvider extends ChangeNotifier {
  final GetDailySalesUseCase getDailySalesUseCase;
  final GetMonthlySalesUseCase getMonthlySalesUseCase;
  final GetYearlySalesUseCase getYearlySalesUseCase;

  AppState<DailySalesListModel> getDailySalesState = AppState();
  AppState<MonthlySalesModel> getMonthlySalesState = AppState();
  AppState<YearlySalesModel> getYearlySalesState = AppState();

  ReportProvider({
    required this.getDailySalesUseCase,
    required this.getMonthlySalesUseCase,
    required this.getYearlySalesUseCase,
  });

  List<DailySalesModel> get dailySalesList =>
      getDailySalesState.data?.dailySales ?? [];

  Future<void> getDailySales({int page = 1, int limit = 10}) async {
    getDailySalesState = AppState.loading();
    notifyListeners();

    getDailySalesState = await getDailySalesUseCase.call(
      page: page,
      limit: limit,
    );
    notifyListeners();
  }

  Future<void> getMonthlySales({int? month, int? year}) async {
    getMonthlySalesState = AppState.loading();
    notifyListeners();

    getMonthlySalesState = await getMonthlySalesUseCase.call(
      month: month,
      year: year,
    );
    notifyListeners();
  }

  Future<void> getYearlySales({int? year}) async {
    getYearlySalesState = AppState.loading();
    notifyListeners();

    getYearlySalesState = await getYearlySalesUseCase.call(year: year);
    notifyListeners();
  }
}
