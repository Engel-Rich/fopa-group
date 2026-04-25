import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debt_model.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/repositories/package_repository.dart';

class GetPackagesDebtUseCase {
  final PackageRepository packageRepository;

  GetPackagesDebtUseCase(this.packageRepository);

  Future<AppState<PackagesDebtModel>> call(String customerId) async {
    try {
      final result = await packageRepository.getPackagesDebt(customerId);
      return AppState.completed(result);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
