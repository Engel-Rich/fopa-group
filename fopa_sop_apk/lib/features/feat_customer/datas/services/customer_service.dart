import 'package:dio/dio.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/dtos/create_customer_dto.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/dtos/update_customer_dto.dart';

class CustomerService {
  final Dio dio;

  CustomerService(this.dio);

  Future<CustomerResponseModel> createCustomer(CreateCustomerDto dto) async {
    try {
      final response = await dio.post('/customers', data: dto.toJson());
      return CustomerResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<List<CustomerResponseModel>> listCustomers({bool? activeOnly}) async {
    try {
      final queryParams = activeOnly != null
          ? {'activeOnly': activeOnly.toString()}
          : null;
      final response = await dio.get(
        '/customers',
        queryParameters: queryParams,
      );
      final List<dynamic> data = response.data;
      return data.map((json) => CustomerResponseModel.fromJson(json)).toList();
    } catch (e) {
      rethrow;
    }
  }

  Future<CustomerResponseModel> updateCustomer(
    String id,
    UpdateCustomerDto dto,
  ) async {
    try {
      final response = await dio.put('/customers/$id', data: dto.toJson());
      return CustomerResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
