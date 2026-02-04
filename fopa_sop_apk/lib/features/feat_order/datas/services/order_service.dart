import 'package:dio/dio.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/dtos/add_payment_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/dtos/create_order_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_list_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/payment_response_model.dart';

class OrderService {
  final Dio dio;

  OrderService(this.dio);

  Future<OrderResponseModel> createOrder(CreateOrderDto dto) async {
    try {
      final response = await dio.post('/orders', data: dto.toJson());
      return OrderResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<OrderResponseModel> getOrderDetails(String id) async {
    try {
      final response = await dio.get('/orders/$id');
      return OrderResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<PaymentResponseModel> addPayment(AddPaymentDto dto) async {
    try {
      final response = await dio.post(
        '/orders/${dto.orderId}/payments',
        data: dto.toJson(),
      );
      return PaymentResponseModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<OrderListModel> listOrders({
    int page = 1,
    int limit = 10,
    String? customerId,
    String? status,
  }) async {
    try {
      final queryParameters = <String, dynamic>{
        'page': page.toString(),
        'limit': limit.toString(),
      };
      if (customerId != null) {
        queryParameters['customerId'] = customerId;
      }
      if (status != null) {
        queryParameters['status'] = status;
      }

      final response = await dio.get(
        '/orders',
        queryParameters: queryParameters,
      );
      return OrderListModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
