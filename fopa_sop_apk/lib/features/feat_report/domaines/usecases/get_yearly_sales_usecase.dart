import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/yearly_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/repositories/report_repository.dart';

class GetYearlySalesUseCase {
  final ReportRepository reportRepository;

  GetYearlySalesUseCase(this.reportRepository);

  Future<AppState<YearlySalesModel>> call({int? year}) async {
    try {
      final response = await reportRepository.getYearlySales(year: year);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
