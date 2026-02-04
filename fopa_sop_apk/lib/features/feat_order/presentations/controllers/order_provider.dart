import 'package:flutter/foundation.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/dtos/create_order_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/dtos/add_payment_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_list_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/payment_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/usecases/create_order_usecase.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/usecases/get_order_details_usecase.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/usecases/add_payment_usecase.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/usecases/list_orders_usecase.dart';

class OrderProvider extends ChangeNotifier {
  final CreateOrderUseCase createOrderUseCase;
  final GetOrderDetailsUseCase getOrderDetailsUseCase;
  final AddPaymentUseCase addPaymentUseCase;
  final ListOrdersUseCase listOrdersUseCase;

  AppState<OrderResponseModel> createOrderState = AppState();
  AppState<OrderResponseModel> getOrderDetailsState = AppState();
  AppState<PaymentResponseModel> addPaymentState = AppState();
  AppState<OrderListModel> listOrdersState = AppState();

  List<OrderResponseModel> localOrders = [];

  OrderProvider({
    required this.createOrderUseCase,
    required this.getOrderDetailsUseCase,
    required this.addPaymentUseCase,
    required this.listOrdersUseCase,
  });

  Future<void> createOrder(CreateOrderDto dto) async {
    createOrderState = AppState.loading();
    notifyListeners();

    createOrderState = await createOrderUseCase.call(dto);
    notifyListeners();
  }

  Future<void> getOrderDetails(String id) async {
    getOrderDetailsState = AppState.loading();
    notifyListeners();

    getOrderDetailsState = await getOrderDetailsUseCase.call(id);
    notifyListeners();
  }

  Future<AppState<PaymentResponseModel>> addPayment(AddPaymentDto dto) async {
    addPaymentState = AppState.loading();
    notifyListeners();

    addPaymentState = await addPaymentUseCase.call(dto);
    notifyListeners();
    return addPaymentState;
  }

  Future<void> listOrders({
    int page = 1,
    int limit = 10,
    String? customerId,
    String? status,
  }) async {
    listOrdersState = AppState.loading();
    notifyListeners();

    listOrdersState = await listOrdersUseCase.call(
      page: page,
      limit: limit,
      customerId: customerId,
      status: status,
    );

    if (listOrdersState.hasNotNullData) {
      if (page == 1) {
        localOrders = listOrdersState.data!.orders;
      } else {
        localOrders.addAll(listOrdersState.data!.orders);
      }
    }

    notifyListeners();
  }
}
