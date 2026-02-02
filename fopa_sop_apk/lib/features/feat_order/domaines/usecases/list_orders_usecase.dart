import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_list_model.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/repositories/order_repository.dart';

class ListOrdersUseCase {
  final OrderRepository orderRepository;

  ListOrdersUseCase(this.orderRepository);

  Future<AppState<OrderListModel>> call({
    int page = 1,
    int limit = 10,
    String? customerId,
    String? status,
  }) async {
    try {
      final response = await orderRepository.listOrders(
        page: page,
        limit: limit,
        customerId: customerId,
        status: status,
      );
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
