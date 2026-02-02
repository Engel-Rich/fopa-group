import 'package:fopa_sop_apk/features/feat_customer/datas/dtos/create_customer_dto.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/dtos/update_customer_dto.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';

abstract class CustomerRepository {
  Future<CustomerResponseModel> createCustomer(CreateCustomerDto dto);
  Future<List<CustomerResponseModel>> listCustomers({bool? activeOnly});
  Future<CustomerResponseModel> updateCustomer(String id, UpdateCustomerDto dto);
}
