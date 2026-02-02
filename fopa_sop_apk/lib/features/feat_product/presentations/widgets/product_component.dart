import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:go_router/go_router.dart';

class ProductComponent extends StatelessWidget {
  final ProductResponseModel productResponseModel;
  const ProductComponent({super.key, required this.productResponseModel});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: SimpleText(
        text: productResponseModel.name,
        weight: FontWeight.bold,
        color: context.titleLargeColor,
      ),
      subtitle: SimpleText(
        text:
            "Stock: ${productResponseModel.quantity} --- PU: ${productResponseModel.price.toInt()} FCFA",
        size: 13,
      ),
      trailing: PopupMenuButton(
        icon: Icon(Icons.more_vert_outlined, color: context.titleLargeColor),
        itemBuilder: (context) => <PopupMenuEntry<void>>[
          PopupMenuItem(
            onTap: () {
              context.pushNamed(
                AppRoutes.createProductRoute,
                extra: productResponseModel,
              );
            },
            child: SimpleText(text: "Modifier"),
          ),
          PopupMenuDivider(color: context.tertiary, thickness: 3),
          PopupMenuItem(
            onTap: () {
              context.pushNamed(
                AppRoutes.manageStockRoute,
                extra: productResponseModel,
              );
            },
            child: SimpleText(text: "Stock"),
          ),
        ],
      ),
      //Icon(Icons.more_vert_outlined, color: context.titleLargeColor),
    );
  }
}
