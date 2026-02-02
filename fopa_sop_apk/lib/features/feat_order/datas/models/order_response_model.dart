import 'package:fopa_sop_apk/features/feat_order/datas/models/order_status.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_item_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/payment_response_model.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';

class OrderResponseModel {
  final String id;
  final String orderNumber;
  final String customerId;
  final CustomerResponseModel? customer;
  final double previousDebt;
  final double subtotal;
  final double totalAmount;
  final double amountPaid;
  final double remainingDebt;
  final OrderStatus status;
  final String userId;
  final UserResponseModel? createdBy;
  final List<OrderItemResponseModel>? items;
  final List<PaymentResponseModel>? payments;
  final DateTime createdAt;
  final DateTime updatedAt;

  OrderResponseModel({
    required this.id,
    required this.orderNumber,
    required this.customerId,
    this.customer,
    required this.previousDebt,
    required this.subtotal,
    required this.totalAmount,
    required this.amountPaid,
    required this.remainingDebt,
    required this.status,
    required this.userId,
    this.createdBy,
    this.items,
    this.payments,
    required this.createdAt,
    required this.updatedAt,
  });

  factory OrderResponseModel.fromJson(Map<String, dynamic> json) {
    return OrderResponseModel(
      id: json['id'] as String,
      orderNumber: json['orderNumber'] as String,
      customerId: json['customerId'] as String,
      customer: json['customer'] != null
          ? CustomerResponseModel.fromJson(json['customer'] as Map<String, dynamic>)
          : null,
      previousDebt: (json['previousDebt'] as num).toDouble(),
      subtotal: (json['subtotal'] as num).toDouble(),
      totalAmount: (json['totalAmount'] as num).toDouble(),
      amountPaid: (json['amountPaid'] as num).toDouble(),
      remainingDebt: (json['remainingDebt'] as num).toDouble(),
      status: OrderStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => OrderStatus.PENDING,
      ),
      userId: json['userId'] as String,
      createdBy: json['createdBy'] != null
          ? UserResponseModel.fromJson(json['createdBy'] as Map<String, dynamic>)
          : null,
      items: json['items'] != null
          ? (json['items'] as List)
              .map((item) => OrderItemResponseModel.fromJson(item as Map<String, dynamic>))
              .toList()
          : null,
      payments: json['payments'] != null
          ? (json['payments'] as List)
              .map((payment) => PaymentResponseModel.fromJson(payment as Map<String, dynamic>))
              .toList()
          : null,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'id': id,
      'orderNumber': orderNumber,
      'customerId': customerId,
      'previousDebt': previousDebt,
      'subtotal': subtotal,
      'totalAmount': totalAmount,
      'amountPaid': amountPaid,
      'remainingDebt': remainingDebt,
      'status': status.name,
      'userId': userId,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
    if (customer != null) map['customer'] = customer!.toJson();
    if (createdBy != null) map['createdBy'] = createdBy!.toJson();
    if (items != null) map['items'] = items!.map((item) => item.toJson()).toList();
    if (payments != null) map['payments'] = payments!.map((payment) => payment.toJson()).toList();
    return map;
  }
}
