import 'package:fopa_sop_apk/features/feat_package/datas/dtos/lend_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/return_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debt_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debts_summary_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_list_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/services/package_service.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/repositories/package_repository.dart';

class PackageRepositoryImpl implements PackageRepository {
  final PackageService packageService;

  PackageRepositoryImpl(this.packageService);

  @override
  Future<PackageTransactionModel> lendPackages(LendPackagesDto dto) =>
      packageService.lendPackages(dto);

  @override
  Future<PackageTransactionModel> returnPackages(ReturnPackagesDto dto) =>
      packageService.returnPackages(dto);

  @override
  Future<PackagesDebtModel> getPackagesDebt(String customerId) =>
      packageService.getPackagesDebt(customerId);

  @override
  Future<List<PackageTransactionModel>> getPackagesHistory(String customerId) =>
      packageService.getPackagesHistory(customerId);

  @override
  Future<PackagesDebtsSummaryModel> getPackagesDebts() =>
      packageService.getPackagesDebts();

  @override
  Future<PackageTransactionListModel> getPackageTransactions({
    PackageTransactionType? type,
    int limit = 50,
    int offset = 0,
  }) => packageService.getPackageTransactions(
    type: type,
    limit: limit,
    offset: offset,
  );
}
