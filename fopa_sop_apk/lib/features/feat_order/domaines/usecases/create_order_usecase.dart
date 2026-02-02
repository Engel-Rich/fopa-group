import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/dtos/create_order_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/repositories/order_repository.dart';

class CreateOrderUseCase {
  final OrderRepository orderRepository;

  CreateOrderUseCase(this.orderRepository);

  Future<AppState<OrderResponseModel>> call(CreateOrderDto dto) async {
    try {
      final response = await orderRepository.createOrder(dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
