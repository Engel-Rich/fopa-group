import 'package:fopa_sop_apk/features/feat_customer/datas/services/customer_service.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/dtos/update_customer_dto.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/repositories/customer_repository.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/dtos/create_customer_dto.dart';

class CustomerRepositoryImpl implements CustomerRepository {
  final CustomerService customerService;

  CustomerRepositoryImpl(this.customerService);

  @override
  Future<CustomerResponseModel> createCustomer(CreateCustomerDto dto) async {
    return await customerService.createCustomer(dto);
  }

  @override
  Future<List<CustomerResponseModel>> listCustomers({bool? activeOnly}) async {
    return await customerService.listCustomers(activeOnly: activeOnly);
  }

  @override
  Future<CustomerResponseModel> updateCustomer(
    String id,
    UpdateCustomerDto dto,
  ) async {
    return await customerService.updateCustomer(id, dto);
  }
}
