import 'package:flutter/foundation.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/cores/services/local_storage_service.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/dtos/create_customer_dto.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/dtos/update_customer_dto.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/usecases/create_customer_usecase.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/usecases/list_customers_usecase.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/usecases/update_customer_usecase.dart';

class CustomerProvider extends ChangeNotifier {
  final CreateCustomerUseCase createCustomerUseCase;
  final ListCustomersUseCase listCustomersUseCase;
  final UpdateCustomerUseCase updateCustomerUseCase;
  final LocalStorageService localStorageService;

  List<CustomerResponseModel> localCustomers = [];
  AppState<CustomerResponseModel> createCustomerState = AppState();
  AppState<List<CustomerResponseModel>> listCustomersState = AppState();
  AppState<CustomerResponseModel> updateCustomerState = AppState();

  CustomerProvider({
    required this.createCustomerUseCase,
    required this.listCustomersUseCase,
    required this.updateCustomerUseCase,
    required this.localStorageService,
  });

  Future<void> createCustomer(CreateCustomerDto dto) async {
    createCustomerState = AppState.loading();
    notifyListeners();

    createCustomerState = await createCustomerUseCase.call(dto);
    listCustomers();
    notifyListeners();
  }

  Future<void> listCustomers({bool? activeOnly}) async {
    listCustomersState = AppState.loading();
    notifyListeners();

    listCustomersState = await listCustomersUseCase.call(
      activeOnly: activeOnly,
    );
    if (listCustomersState.hasNotNullData && listCustomersState.data != null) {
      await localStorageService.storeCustomers(listCustomersState.data!);
      localCustomers = listCustomersState.data!;
    }
    notifyListeners();
  }

  Future<void> updateCustomer(String id, UpdateCustomerDto dto) async {
    updateCustomerState = AppState.loading();
    notifyListeners();

    updateCustomerState = await updateCustomerUseCase.call(id, dto);
    listCustomers();
    notifyListeners();
  }

  Future<void> getSilences() async {
    try {
      // 1. Récupérer depuis le storage local
      final storedCustomers = localStorageService.getCustomers();
      if (storedCustomers != null) {
        localCustomers = storedCustomers;
        notifyListeners();
      }

      // 2. Faire un appel remote sans filtre
      final state = await listCustomersUseCase.call(activeOnly: null);

      if (state.hasNotNullData && state.data != null) {
        // 3. Si succès, mettre à jour le storage et la liste locale
        await localStorageService.storeCustomers(state.data!);
        localCustomers = state.data!;
        notifyListeners();
      }
    } catch (e) {
      // Erreur silencieuse - on garde les données locales
    }
  }
}
