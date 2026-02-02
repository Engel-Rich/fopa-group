import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/repositories/order_repository.dart';

class GetOrderDetailsUseCase {
  final OrderRepository orderRepository;

  GetOrderDetailsUseCase(this.orderRepository);

  Future<AppState<OrderResponseModel>> call(String id) async {
    try {
      final response = await orderRepository.getOrderDetails(id);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
