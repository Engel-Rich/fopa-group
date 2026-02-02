import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:intl/intl.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_response_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_type.dart';

class StockMovementComponent extends StatelessWidget {
  final StockMovementResponseModel movement;
  const StockMovementComponent({super.key, required this.movement});

  @override
  Widget build(BuildContext context) {
    final isEntry = movement.type == StockMovementType.ENTREE;
    final dateFormat = DateFormat('dd/MM/yyyy HH:mm');

    return Container(
      margin: EdgeInsets.only(bottom: 12),
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: context.tertiary,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: isEntry ? Colors.green : Colors.red,
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 4,
            height: 50,
            decoration: BoxDecoration(
              color: isEntry ? Colors.green : Colors.red,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          spacerWidth(12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    SimpleText(
                      text: isEntry ? "ENTRÉE" : "SORTIE",
                      size: 14,
                      weight: FontWeight.bold,
                      color: isEntry ? Colors.green : Colors.red,
                    ),
                    SimpleText(
                      text: "${movement.quantity} unités",
                      size: 14,
                      weight: FontWeight.bold,
                      color: context.titleLargeColor,
                    ),
                  ],
                ),
                spacerHeight(4),
                SimpleText(
                  text: "PU: ${movement.unitPrice.toInt()} FCFA",
                  size: 12,
                  color: context.titleLargeColor,
                ),
                spacerHeight(4),
                SimpleText(
                  text: "Total: ${movement.totalAmount.toInt()} FCFA",
                  size: 12,
                  weight: FontWeight.w600,
                  color: context.titleLargeColor,
                ),
                if (movement.reason != null && movement.reason!.isNotEmpty) ...[
                  spacerHeight(4),
                  SimpleText(
                    text: "Raison: ${movement.reason}",
                    size: 12,
                    color: context.titleLargeColor,
                  ),
                ],
                spacerHeight(4),
                SimpleText(
                  text: dateFormat.format(movement.createdAt),
                  size: 11,
                  color: context.titleLargeColor.withAppOppacity(0.7),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
