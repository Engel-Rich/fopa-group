import 'package:dio/dio.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/lend_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/return_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debt_model.dart';

class PackageService {
  final Dio dio;

  PackageService(this.dio);

  Future<PackageTransactionModel> lendPackages(LendPackagesDto dto) async {
    final response = await dio.post('/packages/lend', data: dto.toJson());
    return PackageTransactionModel.fromJson(response.data);
  }

  Future<PackageTransactionModel> returnPackages(ReturnPackagesDto dto) async {
    final response = await dio.post('/packages/return', data: dto.toJson());
    return PackageTransactionModel.fromJson(response.data);
  }

  Future<PackagesDebtModel> getPackagesDebt(String customerId) async {
    final response = await dio.get('/packages/debt/$customerId');
    return PackagesDebtModel.fromJson(response.data);
  }

  Future<List<PackageTransactionModel>> getPackagesHistory(String customerId) async {
    final response = await dio.get('/packages/history/$customerId');
    return (response.data as List)
        .map((e) => PackageTransactionModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }
}
