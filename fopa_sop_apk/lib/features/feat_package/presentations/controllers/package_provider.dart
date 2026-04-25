import 'package:flutter/foundation.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/lend_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/return_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debt_model.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/usecases/lend_packages_usecase.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/usecases/return_packages_usecase.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/usecases/get_packages_debt_usecase.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/usecases/get_packages_history_usecase.dart';

class PackageProvider extends ChangeNotifier {
  final LendPackagesUseCase lendPackagesUseCase;
  final ReturnPackagesUseCase returnPackagesUseCase;
  final GetPackagesDebtUseCase getPackagesDebtUseCase;
  final GetPackagesHistoryUseCase getPackagesHistoryUseCase;

  AppState<PackageTransactionModel> lendState = AppState();
  AppState<PackageTransactionModel> returnState = AppState();
  AppState<PackagesDebtModel> debtState = AppState();
  AppState<List<PackageTransactionModel>> historyState = AppState();

  PackageProvider({
    required this.lendPackagesUseCase,
    required this.returnPackagesUseCase,
    required this.getPackagesDebtUseCase,
    required this.getPackagesHistoryUseCase,
  });

  Future<AppState<PackageTransactionModel>> lendPackages(LendPackagesDto dto) async {
    lendState = AppState.loading();
    notifyListeners();
    lendState = await lendPackagesUseCase.call(dto);
    notifyListeners();
    return lendState;
  }

  Future<AppState<PackageTransactionModel>> returnPackages(ReturnPackagesDto dto) async {
    returnState = AppState.loading();
    notifyListeners();
    returnState = await returnPackagesUseCase.call(dto);
    notifyListeners();
    return returnState;
  }

  Future<void> getPackagesDebt(String customerId) async {
    debtState = AppState.loading();
    notifyListeners();
    debtState = await getPackagesDebtUseCase.call(customerId);
    notifyListeners();
  }

  Future<void> getPackagesHistory(String customerId) async {
    historyState = AppState.loading();
    notifyListeners();
    historyState = await getPackagesHistoryUseCase.call(customerId);
    notifyListeners();
  }
}
