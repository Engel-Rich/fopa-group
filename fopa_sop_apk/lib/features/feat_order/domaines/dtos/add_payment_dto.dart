import 'package:fopa_sop_apk/features/feat_order/datas/models/payment_method.dart';

class AddPaymentDto {
  final String orderId;
  final double amount;
  final PaymentMethod? paymentMethod;
  final String? reference;

  AddPaymentDto({
    required this.orderId,
    required this.amount,
    this.paymentMethod,
    this.reference,
  });

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{'orderId': orderId, 'amount': amount};
    if (paymentMethod != null) map['paymentMethod'] = paymentMethod!.name;
    if (reference != null) map['reference'] = reference;
    return map;
  }
}
