import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/screens/create_order_screen.dart';

class ProductLineComponent extends StatelessWidget {
  final OrderProduct orderProduct;

  const ProductLineComponent({super.key, required this.orderProduct});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: SimpleText(
              text: orderProduct.product.name,
              size: 16,
              color: context.titleLargeColor,
            ),
          ),
          SimpleText(
            text: "${orderProduct.total.toInt()} FCFA",
            size: 16,
            color: context.titleLargeColor,
            weight: FontWeight.w600,
          ),
        ],
      ),
    );
  }
}
