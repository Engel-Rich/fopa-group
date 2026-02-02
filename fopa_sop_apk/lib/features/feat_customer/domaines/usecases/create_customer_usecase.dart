import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/dtos/create_customer_dto.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/repositories/customer_repository.dart';

class CreateCustomerUseCase {
  final CustomerRepository customerRepository;

  CreateCustomerUseCase(this.customerRepository);

  Future<AppState<CustomerResponseModel>> call(CreateCustomerDto dto) async {
    try {
      final response = await customerRepository.createCustomer(dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
