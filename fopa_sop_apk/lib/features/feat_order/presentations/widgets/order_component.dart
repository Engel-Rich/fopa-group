import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/dtos/add_payment_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_status.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/payment_method.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/controllers/order_provider.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class OrderComponent extends StatelessWidget {
  final OrderResponseModel order;
  final VoidCallback? onPaymentSuccess;

  const OrderComponent({super.key, required this.order, this.onPaymentSuccess});

  String _getStatusLabel(OrderStatus status) {
    switch (status) {
      case OrderStatus.PENDING:
        return 'En attente';
      case OrderStatus.PARTIALLY_PAID:
        return 'Partiellement payé';
      case OrderStatus.PAID:
        return 'Payé';
      case OrderStatus.CANCELLED:
        return 'Annulé';
    }
  }

  Color _getStatusColor(OrderStatus status, BuildContext context) {
    switch (status) {
      case OrderStatus.PENDING:
        return Colors.orange;
      case OrderStatus.PARTIALLY_PAID:
        return Colors.blue;
      case OrderStatus.PAID:
        return Colors.green;
      case OrderStatus.CANCELLED:
        return Colors.red;
    }
  }

  void _onPayerTap(BuildContext context) {
    showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: SimpleText(
          text: "Payer",
          weight: FontWeight.bold,
          color: context.titleLargeColor,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.payment),
              title: SimpleText(
                text: "Payer la commande",
                size: 14,
                color: context.titleLargeColor,
              ),
              onTap: () {
                Navigator.of(ctx).pop();
                _showPaymentDialog(context);
              },
            ),
            ListTile(
              leading: const Icon(Icons.inventory_2_outlined),
              title: SimpleText(
                text: "Gérer les emballages du client",
                size: 14,
                color: context.titleLargeColor,
              ),
              subtitle: SimpleText(
                text: "Dette d'emballages séparée de la commande",
                size: 11,
                color: context.titleLargeColor.withAppOppacity(0.6),
              ),
              onTap: () {
                Navigator.of(ctx).pop();
                // Les emballages ne passent plus par le paiement de la
                // commande : ils sont gérés dans le module Emballages.
                context.pushNamed(
                  AppRoutes.packageManagementRoute,
                  extra: order.customer,
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showPaymentDialog(BuildContext context) {
    final amountController = TextEditingController(
      text: order.remainingDebt > 0
          ? order.remainingDebt.toInt().toString()
          : '',
    );
    showDialog<void>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: SimpleText(
          text: "Montant à payer",
          weight: FontWeight.bold,
          color: context.titleLargeColor,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SimpleText(
              text: "Reste à payer: ${order.remainingDebt.toInt()} FCFA",
              size: 12,
              color: context.titleLargeColor.withAppOppacity(0.8),
            ),
            spacerHeight(8),
            TextFieldApp(
              controller: amountController,
              decoration: inputDecorationApp(
                context: context,
              ).copyWith(hintText: "0"),
              radius: 8,
              keyboardType: TextInputType.number,
              inputFormaters: [FilteringTextInputFormatter.digitsOnly],
              onchange: (_) {},
              containsPadding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 8,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(),
            child: SimpleText(text: "Annuler", color: context.titleLargeColor),
          ),
          TextButton(
            onPressed: () async {
              final amount = double.tryParse(amountController.text);
              if (amount == null || amount <= 0) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text("Montant invalide")),
                );
                return;
              }
              if (amount > order.remainingDebt) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(
                      "Le montant ne peut pas dépasser ${order.remainingDebt.toInt()} FCFA",
                    ),
                  ),
                );
                return;
              }
              final orderProvider = context.read<OrderProvider>();
              final state = await orderProvider.addPayment(
                AddPaymentDto(
                  orderId: order.id,
                  amount: amount,
                  paymentMethod: PaymentMethod.CASH,
                ),
              );
              if (!dialogContext.mounted) return;
              Navigator.of(dialogContext).pop();
              if (state.hasNotNullData) {
                onPaymentSuccess?.call();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text("Paiement enregistré")),
                );
              } else if (state.hasError) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(
                      state.errorModel?.error ?? "Erreur lors du paiement",
                    ),
                  ),
                );
              }
            },
            child: SimpleText(
              text: "Valider",
              color: AppThemes.primaryVariant,
              weight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('dd-MM-yyyy HH:mm');
    final customerName = order.customer?.user?.name ?? 'Client inconnu';
    final orderDate = dateFormat.format(order.createdAt);

    return ListTile(
      trailing:
          order.status == OrderStatus.PARTIALLY_PAID ||
              order.status == OrderStatus.PENDING
          ? TextButton(
              onPressed: () => _onPayerTap(context),
              child: SimpleText(
                text: "Payer",
                size: 12,
                color: AppThemes.primaryVariant,
                weight: FontWeight.w600,
              ),
            )
          : null,
      title: SimpleText(
        text: order.orderNumber,
        weight: FontWeight.bold,
        color: context.titleLargeColor,
      ),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SimpleText(
            text: customerName,
            size: 13,
            color: context.titleLargeColor,
          ),
          SimpleText(
            text: orderDate,
            size: 12,
            color: context.titleLargeColor.withAppOppacity(0.7),
          ),
          Row(
            children: [
              Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: _getStatusColor(
                    order.status,
                    context,
                  ).withAppOppacity(0.2),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: SimpleText(
                  text: _getStatusLabel(order.status),
                  size: 11,
                  color: _getStatusColor(order.status, context),
                  weight: FontWeight.w600,
                ),
              ),
              SizedBox(width: 8),
              SimpleText(
                text: "${order.totalAmount.toInt()} FCFA",
                size: 13,
                weight: FontWeight.bold,
                color: context.titleLargeColor,
              ),
            ],
          ),
        ],
      ),
      onTap: () {
        context.pushNamed(AppRoutes.orderSummaryRoute, extra: order);
      },
    );
  }
}
