import 'package:fopa_sop_apk/features/feat_order/datas/models/payment_method.dart';

class PaymentResponseModel {
  final String id;
  final String orderId;
  final double amount;
  final PaymentMethod paymentMethod;
  final String? reference;
  final String userId;
  final DateTime createdAt;

  PaymentResponseModel({
    required this.id,
    required this.orderId,
    required this.amount,
    required this.paymentMethod,
    this.reference,
    required this.userId,
    required this.createdAt,
  });

  factory PaymentResponseModel.fromJson(Map<String, dynamic> json) {
    return PaymentResponseModel(
      id: json['id'] as String,
      orderId: json['orderId'] as String,
      amount: (json['amount'] as num).toDouble(),
      paymentMethod: PaymentMethod.values.firstWhere(
        (e) => e.name == json['paymentMethod'],
        orElse: () => PaymentMethod.CASH,
      ),
      reference: json['reference'] as String?,
      userId: json['userId'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'id': id,
      'orderId': orderId,
      'amount': amount,
      'paymentMethod': paymentMethod.name,
      'userId': userId,
      'createdAt': createdAt.toIso8601String(),
    };
    if (reference != null) map['reference'] = reference;
    return map;
  }
}
