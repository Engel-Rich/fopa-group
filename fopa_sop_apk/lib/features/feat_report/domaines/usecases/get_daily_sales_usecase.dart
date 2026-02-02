import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/daily_sales_list_model.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/repositories/report_repository.dart';

class GetDailySalesUseCase {
  final ReportRepository reportRepository;

  GetDailySalesUseCase(this.reportRepository);

  Future<AppState<DailySalesListModel>> call({
    int page = 1,
    int limit = 10,
  }) async {
    try {
      final response = await reportRepository.getDailySales(
        page: page,
        limit: limit,
      );
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
