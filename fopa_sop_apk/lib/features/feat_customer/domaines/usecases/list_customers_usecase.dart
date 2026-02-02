import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/repositories/customer_repository.dart';

class ListCustomersUseCase {
  final CustomerRepository customerRepository;

  ListCustomersUseCase(this.customerRepository);

  Future<AppState<List<CustomerResponseModel>>> call({bool? activeOnly}) async {
    try {
      final response = await customerRepository.listCustomers(activeOnly: activeOnly);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
