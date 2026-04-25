import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/lend_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/repositories/package_repository.dart';

class LendPackagesUseCase {
  final PackageRepository packageRepository;

  LendPackagesUseCase(this.packageRepository);

  Future<AppState<PackageTransactionModel>> call(LendPackagesDto dto) async {
    try {
      final result = await packageRepository.lendPackages(dto);
      return AppState.completed(result);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
