import 'package:fopa_sop_apk/features/feat_package/datas/dtos/lend_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/return_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debt_model.dart';

abstract class PackageRepository {
  Future<PackageTransactionModel> lendPackages(LendPackagesDto dto);
  Future<PackageTransactionModel> returnPackages(ReturnPackagesDto dto);
  Future<PackagesDebtModel> getPackagesDebt(String customerId);
  Future<List<PackageTransactionModel>> getPackagesHistory(String customerId);
}
