import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_list_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/repositories/package_repository.dart';

class ListPackageTransactionsUseCase {
  final PackageRepository packageRepository;

  ListPackageTransactionsUseCase(this.packageRepository);

  Future<AppState<PackageTransactionListModel>> call({
    PackageTransactionType? type,
    int limit = 50,
    int offset = 0,
  }) async {
    try {
      final result = await packageRepository.getPackageTransactions(
        type: type,
        limit: limit,
        offset: offset,
      );
      return AppState.completed(result);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
