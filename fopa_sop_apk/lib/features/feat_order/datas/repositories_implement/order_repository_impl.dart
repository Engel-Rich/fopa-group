import 'package:fopa_sop_apk/features/feat_order/datas/services/order_service.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/dtos/add_payment_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/repositories/order_repository.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/dtos/create_order_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_list_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/payment_response_model.dart';

class OrderRepositoryImpl implements OrderRepository {
  final OrderService orderService;

  OrderRepositoryImpl(this.orderService);

  @override
  Future<OrderResponseModel> createOrder(CreateOrderDto dto) async {
    return await orderService.createOrder(dto);
  }

  @override
  Future<OrderResponseModel> getOrderDetails(String id) async {
    return await orderService.getOrderDetails(id);
  }

  @override
  Future<PaymentResponseModel> addPayment(AddPaymentDto dto) async {
    return await orderService.addPayment(dto);
  }

  @override
  Future<OrderListModel> listOrders({
    int page = 1,
    int limit = 10,
    String? customerId,
    String? status,
  }) async {
    return await orderService.listOrders(
      page: page,
      limit: limit,
      customerId: customerId,
      status: status,
    );
  }
}
