import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debts_summary_model.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/repositories/package_repository.dart';

class ListPackagesDebtsUseCase {
  final PackageRepository packageRepository;

  ListPackagesDebtsUseCase(this.packageRepository);

  Future<AppState<PackagesDebtsSummaryModel>> call() async {
    try {
      final result = await packageRepository.getPackagesDebts();
      return AppState.completed(result);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
