import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/dtos/add_payment_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/payment_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/repositories/order_repository.dart';

class AddPaymentUseCase {
  final OrderRepository orderRepository;

  AddPaymentUseCase(this.orderRepository);

  Future<AppState<PaymentResponseModel>> call(AddPaymentDto dto) async {
    try {
      final response = await orderRepository.addPayment(dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
