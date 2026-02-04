import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/dtos/update_customer_dto.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/repositories/customer_repository.dart';

class UpdateCustomerUseCase {
  final CustomerRepository customerRepository;

  UpdateCustomerUseCase(this.customerRepository);

  Future<AppState<CustomerResponseModel>> call(
    String id,
    UpdateCustomerDto dto,
  ) async {
    try {
      final response = await customerRepository.updateCustomer(id, dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
