import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/return_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/repositories/package_repository.dart';

class ReturnPackagesUseCase {
  final PackageRepository packageRepository;

  ReturnPackagesUseCase(this.packageRepository);

  Future<AppState<PackageTransactionModel>> call(ReturnPackagesDto dto) async {
    try {
      final result = await packageRepository.returnPackages(dto);
      return AppState.completed(result);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
