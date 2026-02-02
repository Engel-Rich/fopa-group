import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/monthly_sales_model.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/repositories/report_repository.dart';

class GetMonthlySalesUseCase {
  final ReportRepository reportRepository;

  GetMonthlySalesUseCase(this.reportRepository);

  Future<AppState<MonthlySalesModel>> call({int? month, int? year}) async {
    try {
      final response = await reportRepository.getMonthlySales(
        month: month,
        year: year,
      );
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
