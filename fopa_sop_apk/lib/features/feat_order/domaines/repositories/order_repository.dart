import 'package:fopa_sop_apk/features/feat_order/datas/dtos/create_order_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/dtos/add_payment_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_list_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/payment_response_model.dart';

abstract class OrderRepository {
  Future<OrderResponseModel> createOrder(CreateOrderDto dto);
  Future<OrderResponseModel> getOrderDetails(String id);
  Future<PaymentResponseModel> addPayment(AddPaymentDto dto);
  Future<OrderListModel> listOrders({
    int page,
    int limit,
    String? customerId,
    String? status,
  });
}
