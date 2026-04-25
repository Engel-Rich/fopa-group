import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/repositories/package_repository.dart';

class GetPackagesHistoryUseCase {
  final PackageRepository packageRepository;

  GetPackagesHistoryUseCase(this.packageRepository);

  Future<AppState<List<PackageTransactionModel>>> call(String customerId) async {
    try {
      final result = await packageRepository.getPackagesHistory(customerId);
      return AppState.completed(result);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
