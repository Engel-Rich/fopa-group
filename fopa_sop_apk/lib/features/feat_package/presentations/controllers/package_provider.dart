import 'package:flutter/foundation.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/lend_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/return_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_list_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debt_model.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debts_summary_model.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/usecases/lend_packages_usecase.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/usecases/return_packages_usecase.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/usecases/get_packages_debt_usecase.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/usecases/get_packages_history_usecase.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/usecases/list_packages_debts_usecase.dart';
import 'package:fopa_sop_apk/features/feat_package/domaines/usecases/list_package_transactions_usecase.dart';

/// Module Emballages : dettes d'emballages totalement séparées
/// des dettes produits (argent) gérées par les commandes.
class PackageProvider extends ChangeNotifier {
  final LendPackagesUseCase lendPackagesUseCase;
  final ReturnPackagesUseCase returnPackagesUseCase;
  final GetPackagesDebtUseCase getPackagesDebtUseCase;
  final GetPackagesHistoryUseCase getPackagesHistoryUseCase;
  final ListPackagesDebtsUseCase listPackagesDebtsUseCase;
  final ListPackageTransactionsUseCase listPackageTransactionsUseCase;

  AppState<PackageTransactionModel> lendState = AppState();
  AppState<PackageTransactionModel> returnState = AppState();
  AppState<PackagesDebtModel> debtState = AppState();
  AppState<List<PackageTransactionModel>> historyState = AppState();

  /// Vue globale : clients débiteurs + totaux
  AppState<PackagesDebtsSummaryModel> debtsSummaryState = AppState();

  /// Journal global des opérations
  AppState<PackageTransactionListModel> transactionsState = AppState();
  final List<PackageTransactionModel> transactions = [];
  PackageTransactionType? transactionsFilter;
  bool isLoadingMoreTransactions = false;
  static const int _pageSize = 30;

  PackageProvider({
    required this.lendPackagesUseCase,
    required this.returnPackagesUseCase,
    required this.getPackagesDebtUseCase,
    required this.getPackagesHistoryUseCase,
    required this.listPackagesDebtsUseCase,
    required this.listPackageTransactionsUseCase,
  });

  Future<AppState<PackageTransactionModel>> lendPackages(
    LendPackagesDto dto,
  ) async {
    lendState = AppState.loading();
    notifyListeners();
    lendState = await lendPackagesUseCase.call(dto);
    notifyListeners();
    if (lendState.hasNotNullData) _refreshAfterOperation(dto.customerId);
    return lendState;
  }

  Future<AppState<PackageTransactionModel>> returnPackages(
    ReturnPackagesDto dto,
  ) async {
    returnState = AppState.loading();
    notifyListeners();
    returnState = await returnPackagesUseCase.call(dto);
    notifyListeners();
    if (returnState.hasNotNullData) _refreshAfterOperation(dto.customerId);
    return returnState;
  }

  void _refreshAfterOperation(String customerId) {
    getPackagesDebt(customerId);
    getPackagesHistory(customerId);
    loadDebtsSummary();
    // Le journal sera rechargé à la prochaine ouverture de l'onglet
    transactionsState = AppState();
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

  void clearSelectedCustomer() {
    debtState = AppState();
    historyState = AppState();
    notifyListeners();
  }

  Future<void> loadDebtsSummary() async {
    debtsSummaryState = AppState.loading();
    notifyListeners();
    debtsSummaryState = await listPackagesDebtsUseCase.call();
    notifyListeners();
  }

  Future<void> loadTransactions({PackageTransactionType? type}) async {
    transactionsFilter = type;
    transactionsState = AppState.loading();
    transactions.clear();
    notifyListeners();
    transactionsState = await listPackageTransactionsUseCase.call(
      type: type,
      limit: _pageSize,
      offset: 0,
    );
    if (transactionsState.hasNotNullData) {
      transactions.addAll(transactionsState.data!.data);
    }
    notifyListeners();
  }

  Future<void> loadMoreTransactions() async {
    final current = transactionsState.data;
    if (isLoadingMoreTransactions || current == null) return;
    if (transactions.length >= current.total) return;
    isLoadingMoreTransactions = true;
    notifyListeners();
    final next = await listPackageTransactionsUseCase.call(
      type: transactionsFilter,
      limit: _pageSize,
      offset: transactions.length,
    );
    if (next.hasNotNullData) {
      transactions.addAll(next.data!.data);
      transactionsState = next;
    }
    isLoadingMoreTransactions = false;
    notifyListeners();
  }

  bool get hasMoreTransactions {
    final current = transactionsState.data;
    return current != null && transactions.length < current.total;
  }
}
