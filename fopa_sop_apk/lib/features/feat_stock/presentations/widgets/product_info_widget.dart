import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';

class ProductInfoWidget extends StatelessWidget {
  final ProductResponseModel product;
  const ProductInfoWidget({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: context.tertiary,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SimpleText(
                text: product.name,
                size: 18,
                weight: FontWeight.bold,
                color: context.titleLargeColor,
              ),
              spacerHeight(4),
              SimpleText(
                text: "Stock actuel: ${product.quantity.toInt()}",
                size: 14,
                color: context.titleLargeColor,
              ),
            ],
          ),
          SimpleText(
            text: "${product.price.toInt()} FCFA",
            size: 16,
            weight: FontWeight.bold,
            color: context.primaryColor,
          ),
        ],
      ),
    );
  }
}
